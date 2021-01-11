var http = require('http');
let count = 0;
let initialized = false;
function request(jsonData){
    init(jsonData)
    const sendRequest = () => {
        setTimeout(() => {
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
                        console.log(`[${count++}] Received data : ${data}\n`);
                        // console.log(roughSizeOfObject(data));
                    });
            }).on('error', (err)=>{
                console.log("Error : " + err.message);
            });
            sendRequest();
        }, 2000);
    };
    sendRequest();
};
function init(_client) {
    client = _client;
    initialized = true;
}

exports.request = request;
exports.init = init;