var http = require('http');
const fs = require("fs");
const jsonFile = fs.readFileSync('./assets/config.json', 'utf8')
const jsonData = JSON.parse(jsonFile);
let count = 1;

var server = http.createServer();
server.listen(jsonData.server.port, jsonData.server.ip, () => {
    console.log(`Server is running on http://${jsonData.server.ip}:${jsonData.server.port}\n`);
})

server.on('request', function(req,res){
    fs.readFile(jsonData.file, function(err, data){
     //   res.writeHead(200,{"Content-Type" : "application/octet-stream"});  
        res.write(data);
        console.log("Response completed.")
        console.log(`[${count++}] Sent data size : ${getfileSize(data.length)}\n`);  
        res.end();
    })
})

function getfileSize(x) {
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(x) / Math.log(1024));
    return (x / Math.pow(1024, e)).toFixed(4) + " " + s[e];
  };


/* @for message transmission */

// http.createServer(function(req,res){
//     res.write(jsonData.message);
//     console.log("Response completed.")
//     console.log(`[${count++}] Sent data : ${jsonData.message}\n`);       
//     res.end();
// }).listen(jsonData.server.port, jsonData.server.ip, () =>{
//     console.log(`Server is running on http://${jsonData.server.ip}:${jsonData.server.port}`);
// }).on('request', function(req, res){

// })
