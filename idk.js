const SocketServer = require('websocket').server
const http = require('http')
const { connect } = require('http2')


const server = http.createServer((req, res) => {})

server.listen(3000, ()=>{
    console.log("Listening on port 3000...")
})

wsServer = new SocketServer({httpServer:server})

const connections = []

const response = {
    "seller_key": "bolt-key",
    "seller_name":"Amazon",
    "seller_image_url":"https://guiaimpresion.com/wp-content/uploads/2020/06/Logotipo-Amazon.jpg",
    "products":[
       {
          "0":{
             "name":"Shoes",
             "description":"These are comfortable",
             "photo_url":"https://s3.amazonaws.com/nikeinc/assets/84925/Sp19_BB_Nike_Adapt_20181218_NIKE0538_Detail5_rectangle_1600.jpg",
             "currency":"usd",
             "amount":"300"
          }
       },
       {
          "1":{
             "name":    "Plant",
             "description":"Super green",
             "photo_url":"https://m.media-amazon.com/images/I/61PPYUoc2aL._AC_SX425_.jpg",
             "currency":"usd",
             "amount":"12"
          }
       },
       {
          "2":{
             "name":"BasketBall",
             "description":"NBA Official",
             "photo_url":"https://www.wilson.com/es-es/media/catalog/product/6/b/6b10c76e-ea03-4a5c-b47d-2caae8da68e1_oqybhen2xxfkox94.png",
             "currency":"usd",
             "amount":"999"
          }
       },
       {
          "3":{
             "name":"Candy",
             "description":"Yummy",
             "photo_url":"https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,w_800,h_400,g_auto,q_85,fl_lossy,f_jpg/org/gti5ndttekv6zokuj.jpg",
             "currency":"usd",
             "amount":"10"
          }
       }
    ]
 }

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection '+req.connection)
    connections.push(connection)

    connection.on('message', (mes) => {
        const {key}  = JSON.parse(mes.utf8Data)
        if(key == "XxJxXBODmE9G8NtZeewr"){
            console.log('Se recibieron datos en '+key);
            connection.sendUTF(JSON.stringify(response))
        }
       
        /*connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
        }) */
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})