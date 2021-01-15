var http = require("http");
const { exit } = require("process");
const fs = require("fs");
let count = 1;
let initialized = false;
var startTime,
  endTime,
  endconnectTime = 0;
let sumTime = 0;
let MAX = 10;
var flag = 0;

/*Basic Request */
function request(jsonData) {
  const sendRequest = () => {
    setTimeout(() => {
      if (count > MAX) {
        console.log(
          `Average Delay Time in ${count - 1} packets is ${(
            sumTime / count
          ).toFixed(4)} ms.`
        );
        exit();
      }
      startTime = Date.now();
      http
        .get(`http://${jsonData.server.ip}:${jsonData.server.port}`, (res) => {
          console.log("Request completed.");
          if (res.statusCode !== 200) {
            console.error(
              `Can not get an OK from the server, Code : ${res.statusCode}`
            );
            res.resume();
            return;
          } else {
            if (flag == 0) {
              endconnectTime = Date.now();
              console.log(
                `connection time is : ${endconnectTime - startTime}ms.\n`
              );
            }
          }
          /* Modification Part Start*/
          requestMessage(res);
          /* Modification Part End*/
        })
        .on("error", (err) => {
          console.log("Error : " + err.message);
        });
      sendRequest();
    }, 2000);
  };
  sendRequest();
}

/* Request the 'Message' to IoT Device */
function requestMessage(res) {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  endTime = Date.now();
  res.on("close", () => {
    console.log(`[${count++}] Received data : ${data}`);
  });
  console.log(`Delay Time is : ${endTime - startTime} ms\n`);
  sumTime += endTime - startTime;
}

/* Request the 'File' to IoT Device */
function requestFile(res) {
  res.pipe(file, { end: "false" });
  endTime = Date.now();
  res.on("close", () => {
    fs.readFile(`outputTest/${count}.bin`, function (err, data) {
      console.log(
        `[${count++}] Received data size : ${getfileSize(data.length)}`
      );
      console.log(`Delay Time is : ${endTime - startTime} ms\n`);
    });
    sumTime += endTime - startTime;
    file.end();
  });
}

/* Initizalize the client */
function init(_client) {
  client = _client;
  initialized = true;
}

/* Get file Size */
function getfileSize(x) {
  var s = ["bytes", "kB", "MB", "GB", "TB", "PB"];
  var e = Math.floor(Math.log(x) / Math.log(1024));
  return (x / Math.pow(1024, e)).toFixed(4) + " " + s[e];
}

exports.request = request;
exports.init = init;
exports.getfileSize = getfileSize;
