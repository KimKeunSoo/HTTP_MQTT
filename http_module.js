var http = require('http');
const { exit } = require('process');
const fs = require("fs");
let count = 1;
let initialized = false;
var startTime, endTime;
let sumTime = 0;
let MAX = 5;

function requestMessage(jsonData){
    init(jsonData)
    const sendRequest = () => {
    
        setTimeout(() => {
            if(count > MAX){
                console.log(`Average Delay Time in ${count-1} packets is ${sumTime/count} ms.`);
                exit();
            }
            startTime = Date.now();
            http.get(`http://${jsonData.server.ip}:${jsonData.server.port}`, (res) => {
                console.log("Request completed.")
                    if(res.statusCode !== 200){
                        console.error(`Can not get an OK from the server, Code : ${res.statusCode}`);
                        res.resume();
                        return;
                    }
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });    
                    res.on('close', () => {
                        console.log(`[${count++}] Received data : ${data}`);   
                        endTime = Date.now();
                        console.log(`Average Delay Time in ${count} packets is : ${(endTime-startTime).toFixed(4)} ms.\n`)
                        sumTime += (endTime-startTime);
                    });
            }).on('error', (err)=>{
                console.log("Error : " + err.message);
            });
            sendRequest();   
        }, 2000);
    };
    sendRequest();
};

function requestFile(jsonData){
    init(jsonData)
    const sendRequest = () => {
    
        setTimeout(() => {
           
            startTime = Date.now();
           
            if(count > MAX){
                console.log(`Average Delay Time in ${count-1} packets is ${(sumTime/count).toFixed(4)} ms.\n`);
                exit();
            }
            else{
                file = fs.createWriteStream(`outputTest/${count}.bin`, {flags: 'w'});
                http.get(`http://${jsonData.server.ip}:${jsonData.server.port}`, (res) => {
                    console.log("Request completed.")
                    if(res.statusCode !== 200){
                        console.error(`Can not get an OK from the server, Code : ${res.statusCode}`);
                        res.resume();
                        return;
                        }
                        res.pipe(file, {end: 'false'});
                        endTime = Date.now();
                        res.on('close', () => {
                            fs.readFile(`outputTest/${count}.bin`, function(err,data){
                                console.log(`[${count++}] Received data size : ${getfileSize(data.length)}`)
                                console.log(`Delay Time is : ${(endTime-startTime)} ms\n`)
                            })
                            sumTime += (endTime-startTime);
                            file.end();
                        });
                }).on('error', (err)=>{
                    console.log("Error : " + err.message);
                });
                sendRequest();   
            }
        }, 2000);
    };
    sendRequest();
};


function init(_client) {
    client = _client;
    initialized = true;
}
function getfileSize(x) {
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(x) / Math.log(1024));
    return (x / Math.pow(1024, e)).toFixed(4) + " " + s[e];
  };

exports.requestMessage = requestMessage;
exports.requestFile = requestFile;
exports.init = init;