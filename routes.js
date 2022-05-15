const express = require("express")
const Seller = require("./Structures/seller") 
const Order = require("./Structures/order")
const router = express.Router()


router.get("/get/seller", async (req, res) => {
  const { seller_key } = req.query;
  Seller.findOne({ "_id": seller_key },  {security: 0, __v: 0}, function(err, seller) {
    if (err || !seller) {
      console.log(err)
      res.status(404).send({
        "error": {
          "code": 404,
          "message": `Seller with id '${seller_key}' not found`
        }
      })
    } else {
      return res.status(200).json(seller);
    }
  });

})

router.get("/get/orders", async (req, res) => {
  const { seller_key } = req.query;
  Order.find({ "shop_key": seller_key },  {}, function(err, orders) {
    if (err || !orders) {
      console.log(err)
      res.status(404).send({
        "error": {
          "code": 404,
          "message": `error while looking for orders`
        }
      })
    } else {
      return res.status(200).json({"orders": orders});
    }
  });

})


router.post('/create/order', async(req, res)=>{
  console.log(req.body)
  const order = new Order(req.body)
  order.save(function(err, user) {
        if (err) {
            console.log(err);
            res.status(200).send('Bad Request');
        } else{
          res.status(200).send({ "status": "ok"})
        }
    });
});



router.get('/qr', (req, res) => { res.sendFile(`${__dirname}/src/qr.html`) });


router.get('/mycarts', (req, res) => {
  res.status(200).send({
      'id':'a-sd-b-3-32asdd',
      'order_num': 33
  })
});

router.post('/pucharse/:id', (req, res) => {
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

router.get('*', function(req, res){
  res.status(404).send({
      "error": {
        "code": 404,
        "message": `Some of the aliases you requested do not exist: ${req.url}`
      }
});}); 

module.exports = router