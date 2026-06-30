import http from "http";
import fs from "fs";

const myServer = http.createServer((req, res) => {
  const log = ` ${Date.now()}: ${req.url} New Request Recevied\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
        case "/":
             res.end("HomePage");
            break;
     case "/about":
             res.end("AboutPage");
            break;
        default:
           res.end("404 Page Error");
    }
   
  });
});
myServer.listen(5000, () => {
  console.log("Server start");
});
