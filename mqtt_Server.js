const mqtt = require("mqtt");
const mqtt_module = require("./mqtt_module.js")
const fs = require("fs");

const jsonFile = fs.readFileSync('./assets/config.json', 'utf8')
const jsonData = JSON.parse(jsonFile);

let count = 0;

var client = mqtt.connect(`mqtt://${jsonData.broker.ip}:${jsonData.broker.port}`);

mqtt_module.connectSubscribe(client, jsonData, jsonData.topic_server);
mqtt_module.request(client, jsonData)

client.on("message", function (topic, message) {
  console.log(`[${count++}] Received data : ${message}\n`);
});

