import http from "http";
import fs from "fs";
import url from "url";

const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    return res.end();
  }
  const log = ` ${Date.now()}: ${req.url} New Request Recevied\n`;
  const myURL = url.parse(req.url, true);
  console.log(myURL);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myURL.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const username = myURL.query.myname;
        const number = myURL.query.num; //http://localhost:5000/about?myname=laiba&num=123
        res.end("Hi " + `${username}` + "Your number is: " + `${number}`);
        break;
      default:
        res.end("404 Page Error");
    }
  });
});
myServer.listen(5000, () => {
  console.log("Server start");
});
