const mqtt = require("mqtt");
const mqtt_module = require("./mqtt_module.js");
const fs = require("fs");

const jsonFile = fs.readFileSync("./assets/config.json", "utf8");
const jsonData = JSON.parse(jsonFile);

/* Print first connection time */
var client;
var promise = new Promise((resolve, reject) => {
  var startConnect = Date.now();
  client = mqtt.connect(`mqtt://${jsonData.broker.ip}:${jsonData.broker.port}`);
  mqtt_module.connectSubscribe(client, jsonData, jsonData.topic_server);
  resolve(startConnect);
}).then(function (result) {
  endConnect = Date.now();
  return endConnect - result;
});
promise.then(function (resolvedData) {
  console.log(`\n[First connected Time is ${resolvedData} ms.]\n`);
});

/* Just connect */
// var client = mqtt.connect(`mqtt://${jsonData.broker.ip}:${jsonData.broker.port}`)
// mqtt_module.connectSubscribe(client, jsonData, jsonData.topic_server)

mqtt_module.request(client, jsonData);
mqtt_module.ReceivedFile(client);
