/*
 * @Author: veni
 * @Date: 2020-03-27 19:21:24
 * @LastEditors: veni
 * @LastEditTime: 2020-03-28 16:45:56
 * @Description: 
 */
var http = require('http')
var server = http.createServer()
var fs = require("fs");

server.on('request',function(request,response){
    var url = request.url;
    if(url ==='/'){
        //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
        response.writeHead(200,{'Content-Type':'text/html'})
        // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
        fs.readFile('../11.Promise.resolve缓存.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }
            response.end(data);
        });    
    }
});


server.listen(9001, function(){
    console.log('服务器正在端口号：9001上运行......');
})