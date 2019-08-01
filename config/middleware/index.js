var path = require("path");
var fs   = require("fs")
var mimeType = require("./mimeType");
var vm = require("vm");
var proxy = require('./proxy')

function out(req,res,content,type){
  var callback = req.query.callback;
  if(type){
    res.set('Content-Type', type+";charset=UTF-8");
  }

  if(callback){
    res.write(callback+"("+content+");");
  }else{
    res.write(content);
  }
  res.end();
}

function runMockFile(req,res,file){
  fs.readFile(file,{
    charset:"utf-8"
  },function(err,content){
    if(err){
      out(req,res,err.message,"text/html");
      return;
    }
    var exports = {};
    var sandbox = {
      req:req,
      res:res,
      exports:exports,
      module:{exports:exports}
    }
    try{
      vm.runInNewContext(content,sandbox);
      out(req,res,JSON.stringify(sandbox.module.exports),mimeType["json"]);
    }catch(e){
      out(req,res,e.message,"text/html");
    }
  })
}
function outputJson(req,res,content){
  var sandbox = {
    result:{}
  }
  try{
    vm.runInNewContext('result = ('+content+");", sandbox);
    var json = JSON.stringify(sandbox.result);
    out(req,res,json,mimeType["json"]);
  }catch(e){
    out(req,res,e.message,"text/html");
  }
}

function mock(req,res,file){
  console.log('mock '+req.path+';'+file)
  var ext = path.extname(file);
  if(ext == ".js"){
    runMockFile(req,res,file);
    return;
  }else if(ext == '.json'){
    var content = fs.readFileSync(file)
    outputJson(req,res,content)
  }else{
    res.sendFile(file)
  }
}


function checkExists(pathWithoutExt,extlist,cb){
  extlist = [].concat(extlist)

  function check(){
    if(!extlist || !extlist.length){
      cb(false)
      return;
    }
    var ext = extlist.shift();
    var fPath = pathWithoutExt+ext;
    fs.exists(fPath,function(exists){
      if(exists){
        cb(true,fPath);
        return;
      }else{
        check();
      }
    })
  }
  check();
}


module.exports = function(app,mockFilePath,mockConfigPath){
  // proxy.watchConfig(mockConfigPath)

  app.use(function(req,res,next){
    // add header
    const proxyRule = proxy.isProxy(req.path,req)
    if(proxyRule){
      proxy.proxy(req,res,proxyRule)
      return;
    }

    var rPath = path.join(mockFilePath,req.path);

    fs.exists(rPath,function(exist){
      if(exist){
        if(!fs.statSync(rPath).isDirectory()){
          mock(req,res,rPath);
          return
        }
      }
      var extname = path.extname(rPath);
      var dir = path.dirname(rPath)
      try{
        if(!fs.existsSync(dir)){
          next()
          return
        }
        var fileList = fs.readdirSync(dir)
        var fileName =  path.basename(rPath,extname)

        var realFleName = fileList.find(function (a) {
          var ext = path.extname(a)
          var fullPath = path.join(dir,a)
          if(fs.statSync(fullPath).isDirectory()){
            return false
          }
          var realName = path.basename(a,ext)
          return realName == fileName
        })
        if(!realFleName && fs.existsSync(path.join(dir,'index.js'))){
          realFleName = 'index.js'
        }
        if(realFleName){
          var realFile = path.join(dir,realFleName)
          mock(req,res,realFile);
        }else{
          next();
        }
      }catch(e){
        console.error(e)
        next()
      }

    })
  })

}
