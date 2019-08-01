/**
 * @description 代理服务器
 * @autor dongyajie@lianjia.com
 * @date  16/8/31.
 */
var path = require('path')
var fs = require('fs')
var vm = require('vm')
var Url = require('url')
var through = require('through')
var harmon = require('harmon')
var httpProxy = require('http-proxy')
var proxyServer = httpProxy.createProxyServer({})
// 读取配置

var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;


const config = {
}

let buildReg = (route) => {

  return new RegExp(route);

}
function saveConfig(obj){
  config.proxy = obj.proxy;
  config.remoteMapping = obj.remoteMapping || null
  let list = []
  if(Array.isArray(obj.api)){
    obj.api.forEach(api =>{
      let proxyObj = {
        rule:buildReg(api.router),
        config:api
      }
      list.push(proxyObj)
    })
  }else{
    let keys = Object.keys(obj.api || {})

    for(let key of keys){
      try{
        let proxyObj = {
          rule:buildReg(key),
          config:obj.api[key]
        }

        list.push(proxyObj)
      }catch(e){
        console.error(e)
      }
    }
  }
  config.routers = list;
}

function execConfig(filename,content){
  var exp = {};
  var sandbox = {
    exports:exp,
    console:console,
    require:require,
    through,
    module:{exports:exp}
  }
  try{
    vm.createContext(sandbox)
    vm.runInContext(content,sandbox);
    let cfg = sandbox.module.exports
    saveConfig(cfg)
  }catch(e){
    console.error(e)
  }
}

function readConfig(configDir){
  var cwd = configDir;
  var mockPath = path.join(cwd,"mock.js")
  fs.exists(mockPath,(exists) => {
    fs.readFile(mockPath,{charset:"utf-8"},(err,data) => {
      if(err){
        console.log(err)
        return;
      }
      execConfig(mockPath,data.toString())
    })
  })
}

function watchConfig(mockConfig){
  var configDir = path.dirname(mockConfig)
  console.log('config dir',configDir)
  fs.exists(configDir,(exists) => {
    if(!exists){
      return
    }
    fs.watch(configDir,(eventType,filename) =>{
      if(filename && filename.indexOf("mock.js") >= 0 ){
        console.log("mock config change")
        readConfig(configDir);
      }
    })
    readConfig(configDir);
  })

}



function isProxy(reqPath,req){
  if(!config.proxy){
    return false
  }

  for(let route of config.routers){
    if(route.rule.test(reqPath)){
      if(route.config.proxy === false){
        return false
      }
      if(route.config.html){
        if(isHtmlRequest(req)){
          return route.config
        }
        continue
      }
      if(route.config.ajax){
        if(req.header('X-Requested-With') == 'XMLHttpRequest'){
          return route.config
        }
        return false
      }
      return route.config
    }
  }
  return false;
}

const escapeMd5FileName = (filePath) =>{
  const dirs = path.dirname(filePath)
  const extname = path.extname(filePath)
  const filename = path.basename(filePath,extname)
  const fileArr = filename.split('.')
  if(fileArr.length >= 2){
    fileArr.pop()
  }

  return path.join(dirs,fileArr.join('.')+extname)
}

const getReplaceUrl = (mapping,value) =>{
  const keys = Object.keys(mapping)
  for(let remoteStatic of keys){
    const localStatic = mapping[remoteStatic]
    if(value.indexOf(remoteStatic) >=0){
      value = value.replace(remoteStatic,localStatic)
      const obj = Url.parse(value)
      obj.pathname = escapeMd5FileName(obj.pathname)
      obj.path = escapeMd5FileName(obj.path)
      obj.protocol = 'http:'
      return Url.format(obj)
    }
  }
  return value
}

const replaceToLocalDefault = (mapping) =>{
  // remoteStatic,localStatic
  return [
    {
      query:"link",
      func:(node)=>{
        node.getAttribute('href',(value)=>{
          if(value){
            node.setAttribute('href',getReplaceUrl(mapping,value))
          }
        })
      }
    },
    {
      query:"script",
      func:(node)=>{
        node.getAttribute('src',(value)=>{
          if(value){
            node.setAttribute('src',getReplaceUrl(mapping,value))
          }
        })
      }
    }
  ]

}


const isHtmlRequest = (req) =>{
  let check = req.get('accept')
  const ct = req.get('content-type')
  if(ct){
    check = check + ct
  }
  return check.indexOf('html') >=0
}
module.exports = {
  isProxy,
  watchConfig(configPath){
    watchConfig(configPath)
  },
  proxy:(req,res,proxyRule)=>{
    let reqPath = req.path
    let proxyRoute
    for(let route of config.routers){
      if(route.rule.test(reqPath)){
        proxyRoute = route.config
        break;
      }
    }

    let bypass = proxyRoute.bypass
    let target = `${proxyRoute.target}`
    if(bypass){
      let passPath = bypass(req,res)
      if(passPath){
        req.url = passPath
      }
    }

    console.log(`proxy ${reqPath} to ${target}${req.url}`)
    if(isHtmlRequest(req)){
      let replaceRegs = []

      if(proxyRule.replaceToLocal && config.remoteMapping){
        replaceRegs = replaceRegs.concat(replaceToLocalDefault(config.remoteMapping))
      }
      if(proxyRule.replace){
        const replaceRule = [].concat(proxyRule.replace)
        replaceRegs = replaceRegs.concat(replaceRule)

      }
      if(replaceRegs.length){
        harmon([],replaceRegs)(req,res,()=>{
        })
      }
    }


    proxyServer.web(req,res,{
      target:target,
      changeOrigin:true
    })
  }
}
