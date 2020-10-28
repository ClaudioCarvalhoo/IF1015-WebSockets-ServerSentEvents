var WebSocketServer = require("ws").Server;
var http = require("http");
wss = new WebSocketServer({ port: 7474, path: "/chat" });

let clients = [];
let readClients = new Set();

http
  .createServer(function (req, res) {
    readClients.add(res);
  })
  .listen(4747);

wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);
    if (message.type === "login") {
      clients.push([ws, message.name]);
    } else if (message.type === "message") {
      response = JSON.stringify({
        name: clients.find((x) => x[0] === ws)[1],
        message: message.message,
      });
      clients.forEach((client) => {
        client[0].send(response);
      });
      readClients.forEach((client) => {
        client.writeHeader(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Access-Control-Allow-Origin": "*",
        });
        client.write("data: " + response + "\n\n");
      });
    }
  });
});
