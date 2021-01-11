let initialized = false
let count = 0;

function connectSubscribe(client, jsonData, topic){
    client.on("connect", () => {
        if (!client) {
            throw Error(
              `MQTT.connect() error. (ip: ${jsonData.broker.ip}, port: ${jsonData.broker.port})`
            );
          }
        console.log(`connected to MQTT broker [${jsonData.broker.ip}]`);
        console.log(`Client ID is ${client.options.clientId}`);
        client.subscribe(topic, (err) => {
          if (err){
              console.log(`cannot subscribe on ${topic}`);
              return;
          }
          if (!err){
              console.log(`complete subscribe on ${topic}\n`);
          }
          init(client); 
        });
      });
    
}

function response(client, jsonData){
    client.on("message", function (string, message) {
        if(!initialized){
            throw error("Pub must be initialized.");
        }
        if( message.toString() === 'GET'){
            client.publish(jsonData.topic_server, jsonData.message);
            console.log("Response completed.")
            console.log(`[${count++}] Sent data : ${jsonData.message}\n`);              
        }
    });
}


function request(client, jsonData){
    init(client)
    if(!initialized){
        throw Error("Pub must be initialized.");
    }
    
    const sendRequest = () => {
        setTimeout(() => {
            client.publish(jsonData.topic_client, "GET")
            console.log("Request completed.")
            sendRequest() 
        }, 2000)
    }
    sendRequest();
}

function init(_client) {
    client = _client;
    initialized = true;
}

exports.connectSubscribe = connectSubscribe;
exports.response = response;
exports.request = request;
exports.init = init;