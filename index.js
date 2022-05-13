const express = require('express');
const mongoose = require('mongoose');
const http = require('http')

const routes = require("./routes") 
const Seller = require("./Schemas/seller")

const {Server, Socket} = require('socket.io')

const app = express();

// app.use(express.json())
app.use("/api", routes) 

const server = http.createServer(app);

const io = new Server(server)

const uri = "mongodb+srv://demo:testpassword@cluster0.zvnbu.mongodb.net/database?retryWrites=true&w=majority";

mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => {
        console.log('conectado a '+process.env.PORT);
        server.listen(
            process.env.PORT || 3000,
            () => console.log('BoltPay its alive')
        )
})


async function run(shopname){
    const seller = new Seller(
        {
            "rapyd": {
              "secret_key": null,
              "acces_key": null
            },
            "shop_data": {
              "shop_name": "Doll",
              "contact_mail": null,
              "contact_number": null,
              "shop_adress": null,
              "username": "mytestuserr",
              "password": "supersecret"
            },
            "orders":[]
          }
    )
    
    seller.save().then(()=> console.log("Client saved!"))
}

app.post('/connect/:id', (req, res) => {
    const { id } = req.params;
    const data = JSON.stringify(req.body);
    console.log('post request with: '+ data)
    io.emit(id, data)
    res.send({
        "status": "ok",
        "data": "x "+data,
        "send to": id
    })
    
});

app.get('/styles', (req, res) => { res.sendFile(`${__dirname}/client/styles.css`) });

app.get('/qr', (req, res) => { res.sendFile(`${__dirname}/client/qr.html`) });

app.get('/pop', (req, res) => {
    res.sendFile(`${__dirname}/client/popup.html`)
});

app.get('/home', (req, res) => {
   res.sendFile(`${__dirname}/client/index.html`)
});

app.get('/mycarts', (req, res) => {
    res.status(200).send({
        'id':'a-sd-b-3-32asdd',
        'order_num': 33
    })
});

app.post('/pucharse/:id', (req, res) => {
    const { id } = req.params;
    const { order_num } = req.body;

    if(!order_num){
        res.status(418).send({message:'Wee need an order number!'})
    }
    
    res.send({  
        "status": "ok",
        "order_id": order_num
    })

});

app.post('/create/:shopname', (req, res) => {
    const { shopname } = req.params;
    run(shopname)
    res.send({  
        "status": "ok"
    })
});



 
