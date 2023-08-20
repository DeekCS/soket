const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Handle location updates from clients
  socket.on("sendLocation", (data) => {
    console.log("got data,", data);
    // Broadcast the location to all connected clients except the sender
    socket.broadcast.emit("receiveLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
