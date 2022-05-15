require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const routes = require("./routes") 
const Seller = require("./Structures/seller")


const app = express();

app.use(express.json())
app.use("/api", routes) 


const {Server, Socket} = require('socket.io')
const http = require('http')
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', (data)=>{
    console.log(`Nuevo usuario conectado  ${data.id} ${data.client.conn.server.clientsCount} usuarios conectados!`)
    io.emit("c", `${data.id}`) 
})

io.on('testchannel', (data)=>{ io.emit("testchannel", data) })

mongoose
    .connect(process.env.URI, { useNewUrlParser: true })
	.then(() => { server.listen(process.env.PORT || 3000, (socket) => console.log('BoltPay its alive')) })


async function create_seller(){
    const seller = new Seller(
        {
            "rapyd": {
              "secret_key": null,
              "acces_key": null
            },
            "shop_data": {
              "shop_name": "Benja insumos",
              "contact_mail": null,
              "contact_number": null,
              "shop_adress": null
            },
            "security": {
              "username": "benjatld",
              "password": "1234",
              "acces_token": "awas"
            },
            "orders": []
          }
    )
    
    seller.save().then(()=> console.log("Seller saved!")) }

app.post('/create/shop', (req, res) => {
  create_seller()
  res.send({  
      "status": "ok"
  })
});




async function create_Order(){
  const order = new Order(
    
  )
  
  order.save().then(()=> console.log("Order saved!")) }







app.get('/', (req, res) => { res.redirect('/api') });


 
