var webSocket = require("ws");
var webSocketServer = webSocket.Server;
var port = 3001;
var ws = new webSocketServer({
  port: port
});
var messages = [];

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message received: " + data);
    if(data.substring(0,6)==="/topic") {
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to '" + data.substring(7) + "'")
      });
      messages.unshift("*** Topic is '" + data.substring(7) + "'");
    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
    }
  });
});
