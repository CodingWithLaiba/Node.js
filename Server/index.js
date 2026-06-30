import http from "http";

const myServer = http.createServer((req, res) => {
  console.log("New Request received");
  res.end("Hello  from Server");
});
myServer.listen(5000, () => {
  console.log("Server start");
});
