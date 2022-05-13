const express = require('express');
const app = express();
const http = require('http');
const { userInfo } = require('os');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected '+socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  


server.listen( process.env.PORT || 3000, (socket) => console.log('BoltPay its alive') );