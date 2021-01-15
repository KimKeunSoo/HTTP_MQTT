var http = require("http");
const fs = require("fs");
const http_module = require("./http_module.js");
const jsonFile = fs.readFileSync("./assets/config.json", "utf8");
const jsonData = JSON.parse(jsonFile);
let count = 1;

/* First connection */
var startconnectTime = Date.now();
var endconnectTime;
http.get(`http://${jsonData.server.ip}:${jsonData.server.port}`, (res) => {
  if (res.statusCode !== 200) {
    console.error(
      `Can not get an OK from the server, Code : ${res.statusCode}`
    );
    res.resume();
    return;
  } else {
    endconnectTime = Date.now();
    console.log(`connection time is : ${endconnectTime - startTime}ms.\n`);
  }
  res.end();
});

/* Create Server and listen */
/* var server = http.createServer();
server.listen(jsonData.server.port, jsonData.server.ip, () => {
  console.log(
    `Server is running on http://${jsonData.server.ip}:${jsonData.server.port}\n`
  );
}); */

/*Response Data Info to Server*/
/* server.on("request", function (req, res) {
  fs.readFile(jsonData.file, function (err, data) {
    res.write(data);
    console.log("Response completed.");
    console.log(
      `[${count++}] Sent data size : ${http_module.getfileSize(data.length)}\n`
    );
    res.end();
  });
});  */

/*Response Message Info to Server*/
// server.on("request", function (req, res) {
//   res.write(jsonData.message);
//   console.log("Response completed.");
//   console.log(`[${count++}] Sent data : ${jsonData.message}\n`);
//   res.end();
// });
