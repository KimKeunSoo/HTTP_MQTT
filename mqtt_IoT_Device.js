const mqtt = require("mqtt");
const mqtt_module = require("./mqtt_module.js")
const fs = require("fs");

const jsonFile = fs.readFileSync('./assets/config.json', 'utf8')
const jsonData = JSON.parse(jsonFile);

var client = mqtt.connect(`mqtt://${jsonData.broker.ip}:${jsonData.broker.port}`);

mqtt_module.connectSubscribe(client, jsonData, jsonData.topic_client);
mqtt_module.responseFile(client, jsonData);

