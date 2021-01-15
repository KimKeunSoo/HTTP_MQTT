var http = require("http");
const fs = require("fs");
const http_module = require("./http_module.js");
const jsonFile = fs.readFileSync("./assets/config.json", "utf8");
const jsonData = JSON.parse(jsonFile);

/* First Connection */
http
  .createServer()
  .listen(jsonData.server.port, jsonData.server.ip, () => {
    console.log(
      `Server is running on http://${jsonData.server.ip}:${jsonData.server.port}\n`
    );
  })
  .on("request", function (req, res) {
    res.end();
  });

/* Communicatino start */
/* http_module.request(jsonData); */
