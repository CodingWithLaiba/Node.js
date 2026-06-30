import http from "http";
import fs from "fs";
import url from "url";

const myServer = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    return res.end();
  }
  const log = ` ${Date.now()}: ${req.method} ${req.url} New Request Recevied\n`;
  const myURL = url.parse(req.url, true);
  // console.log(myURL);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myURL.pathname) {
      case "/":
        if(req.method === "GET")
        res.end("HomePage");
        break;
      case "/about":
        const username = myURL.query.myname;
        const number = myURL.query.num; //http://localhost:5000/about?myname=laiba&num=123
        res.end("Hi " + `${username}` + "Your number is: " + `${number}`);
        break;
        case("/signup"):
        if(req.method === "GET"){
          res.end("This is signup form")
        }
        else if(req.method === "POST"){
          res.end("success")
        }
      default:
        res.end("404 Page Error");
    }
  });
});
myServer.listen(5000, () => {
  console.log("Server start");
});
