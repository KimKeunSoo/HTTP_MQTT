var http = require('http');
const fs = require("fs");
const jsonFile = fs.readFileSync('./assets/config.json', 'utf8')
const jsonData = JSON.parse(jsonFile);
let count = 0;

http.createServer(function(req,res){
    // res.writeHead(200,{
    //     'Content-Length' : Buffer.byteLength(jsonData.message),
    //     'Content-Type': 'text/plain'
    // })
    res.write(jsonData.message);
    console.log("Response completed.")
    console.log(`[${count++}] Sent data : ${jsonData.message}\n`);       
    res.end();
}).listen(jsonData.server.port, jsonData.server.ip, () =>{
    console.log(`Server is running on http://${jsonData.server.ip}:${jsonData.server.port}`);
});
