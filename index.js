const express = require('express');
const app = express();
const PORT = 8080;


app.use(express.json())

const http = require('http')
const server = http.createServer(app);

const {Server, Socket} = require('socket.io')

const io = new Server(server)



app.post('/connect/:id', (req, res) => {
    const { id } = req.params;
    const data = JSON.stringify(req.body);
    
    // io.on('connection', (socket)=> {
    //     console.log('connected '+socket.id)
    //     socket.emit(id, data)
    //     socket.on('chat', (msg)=>{
    //        console.log('Mensaje: ' + msg)
    //        socket.emit('chat', 'emito algo./.asd.')
    //     })
    // });
    console.log('post request with: '+ data)

    io.emit(id, data)
    res.send({
        "status": "ok",
        "data": "x "+data,
        "send to": id
    })
    
});

app.get('/styles', (req, res) => {
    res.sendFile(`${__dirname}/client/styles.css`)
});

app.get('/qr', (req, res) => {
    res.sendFile(`${__dirname}/client/qr.html`)
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

app.get('*', function(req, res){
    res.status(404).send({
        "error": {
          "code": 404,
          "message": `Some of the aliases you requested do not exist: ${req.url}`
        }
      });
  });

server.listen(
    process.env.PORT || 3000,
    () => console.log('BoltPay its alive')
)