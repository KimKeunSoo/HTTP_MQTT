const fs = require("fs");
const http_module = require("./http_module.js")
const jsonFile = fs.readFileSync('./assets/config.json', 'utf8')
const jsonData = JSON.parse(jsonFile);


http_module.requestFile(jsonData);