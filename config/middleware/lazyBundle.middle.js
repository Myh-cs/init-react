/**
 * @description
 * @date  2017/8/31.
 */
const path = require('path')
const fs = require('fs')
var parseRange = require("range-parser");
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')

const getFileName = (filePath)=>{
    const extName = path.extname(filePath)
    const basename = path.basename(filePath,extName)
    return path.join(path.dirname(filePath),basename)
}

const handleRangeHeaders =  function handleRangeHeaders(content, req, res) {
    //assumes express API. For other servers, need to add logic to access alternative header APIs
    res.setHeader("Accept-Ranges", "bytes");
    if(req.headers.range) {
        var ranges = parseRange(content.length, req.headers.range);

        // unsatisfiable
        if(-1 == ranges) {
            res.setHeader("Content-Range", "bytes */" + content.length);
            res.statusCode = 416;
        }

        // valid (syntactically invalid/multiple ranges are treated as a regular response)
        if(-2 != ranges && ranges.length === 1) {
            // Content-Range
            res.statusCode = 206;
            var length = content.length;
            res.setHeader(
                "Content-Range",
                "bytes " + ranges[0].start + "-" + ranges[0].end + "/" + length
            );

            content = content.slice(ranges[0].start, ranges[0].end + 1);
        }
    }
    return content;
}
module.exports = function (server, redskull, compiler,config) {
    let _compilation = null
    compiler.plugin("done", function (stats) {
        _compilation = stats.compilation
    })
    const addEntry = {}


    const callbacks = []
    let isCompiling = false

    const listener = ()=>{
        isCompiling = false
        callbacks.forEach((callback)=>{
            callback()
        })
        callbacks.length = 0
    }

    compiler.plugin('done',listener)
    compiler.plugin('run',()=>{
        isCompiling = true
    })


    server.app.use(function(req,res,next){
        const reqPath = req.path
        const jsStr = '/__webpack__require__/js/'

        const sendFileContent = (jsPath,fileName)=>{
            const ofs = compiler.outputFileSystem
            jsPath = path.join(compiler.outputPath,'js',jsPath)
            try{
                const stat = ofs.statSync(jsPath);
                if(!stat.isFile()) {
                    next()
                    return
                }
            }catch(ex){
                console.error(ex)
                next()
                return
            }

            var content = ofs.readFileSync(jsPath);
            content = `window.__webpack__chunk = window.__webpack__chunk || {};window.__webpack__chunk["${fileName}"]=${content}`
            content = handleRangeHeaders(content, req, res);
            res.setHeader("Content-Type",  "text/javascript; charset=UTF-8");
            res.setHeader("Content-Length", content.length);
            res.send(content)
            res.end()
        }

        if(reqPath.indexOf(jsStr) == 0 && path.extname(reqPath) == '.js'){
            const jsPath = reqPath.substring(jsStr.length)
            const fileName = getFileName(jsPath)
            if(!addEntry[jsPath]){
                addEntry[jsPath] = 1
                compiler.apply(new SingleEntryPlugin(redskull.src, fileName,fileName));
                server.middleware.invalidate(function(){

                })
                callbacks.push(()=>{
                    sendFileContent(jsPath,fileName)
                })
                return
            }
            if(isCompiling){
                callbacks.push(()=>{
                    sendFileContent(jsPath,fileName)
                })
            }else{
                sendFileContent(jsPath,fileName)
            }
        }
        next()
    })
}
