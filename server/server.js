require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {Server, Socket} = require('socket.io')
const http = require('http')


//Import Routes
const authRoute = require("./routes/auth") 
const detailsRoute = require("./routes/details") 
const shopRoute = require("./routes/shop") 
const clientRoute = require("./routes/client")

const app = express();
const server = http.createServer(app);
const io = new Server(server)


app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/details", detailsRoute); 
app.use("/api/shop", shopRoute); 
app.use("/api/client", clientRoute); 

io.on('connection', (data)=>{
    console.log(`Nuevo usuario conectado  ${data.id} ${data.client.conn.server.clientsCount} usuarios conectados!`)
    io.emit("c", `${data.id}`) 
})


mongoose
    .connect(process.env.URI, { useNewUrlParser: true })
	.then(() => { server.listen(process.env.PORT || 3000, (socket) => console.log('BoltPay its alive')) })


app.get('/', (req, res) => { res.redirect('/api') });

app.get('*', function(req, res){
  res.status(404).send({
      "error": {
        "code": 404,
        "message": `Some of the aliases you requested do not exist: ${req.url}`
      }
});}); 
 
