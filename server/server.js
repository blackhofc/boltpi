require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const SocketServer = require('websocket').server
const http = require('http')
const path = require('path');

//Import Routes
const authRoute = require("./routes/auth") 
const detailsRoute = require("./routes/details") 
const shopRoute = require("./routes/shop") 
const clientRoute = require("./routes/client")

const app = express();
const server = http.createServer(app);
wsServer = new SocketServer({httpServer:server})

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/auth", authRoute);
app.use("/api/details", detailsRoute); 
app.use("/api/shop", shopRoute); 
app.use("/api/client", clientRoute); 


const connections = []

wsServer.getUniqueID = function () {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};


wsServer.on('request', (req) => {
    const connection = req.accept()
    const {device} = req.resourceURL.query
    const {key} = req.resourceURL.query;
    const {shopkey} = req.resourceURL.query;

    connection.id = key
    connection.reciver = shopkey
    connection.device = device

    connections.push(connection)
    connection.on('message', (mes) => {
      try{
        if(connection.device == "app"){
          const to_send = connections[connections.findIndex(x => x.id === connections[connections.findIndex(x => x.id === key)].reciver)]
          to_send.send(mes.utf8Data)
        }else if(connection.device == "web"){
          const parsed = JSON.parse(mes.utf8Data);
          const to_send = connections[connections.findIndex(x => x.id === parsed["send_to"])]
          to_send.sendUTF(JSON.stringify(parsed["data"]));
        }
      }catch(err){}
       
    })
    connection.on('close', (resCode, des) => {
        connections.splice(connections.indexOf(connection), 1)
    })
  
})


mongoose
    .connect(process.env.URI, { useNewUrlParser: true })
	  .then(() => { server.listen(process.env.PORT || 3000, (socket) => console.log('BoltPay its alive')) })

app.get('/testqr', function(req,res) { res.sendFile( '/public/qr.html', { root: process.cwd() }); });

app.get('/', (req, res) => { res.redirect('/api') });

app.get('*', function(req, res){
  res.status(404).send({
      "error": {
        "code": 404,
        "message": `Some of the aliases you requested do not exist: ${req.url}`
      }
});}); 
 
