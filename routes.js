const express = require("express")
const Seller = require("./Structures/seller") 
const router = express.Router()


router.get("/get/seller", async (req, res) => {
  const { user } = req.query;
  Seller.findOne({ "security.username": user },  { security: 1, __v: 0 }, function(err, seller) {
    if (err || !seller) {
      res.status(404).send({
        "error": {
          "code": 404,
          "message": `Seller '${user}' not found`
        }
      })
    } else {
      return res.status(200).json(seller);
    }
  });
  
/*	

Seller.findOne({_id: req.body}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  });
const seller = await Seller.findOne()
  console.log("id "+ id)
  if(seller){
    res.send(seller)
  }else{
    res.status(404).send({
      "error": {
        "code": 404,
        "message": `Seller ${req.params.id} not found`
      }
    })
  } */
})

router.get('*', function(req, res){
    res.status(404).send({
        "error": {
          "code": 404,
          "message": `Some of the aliases you requested do not exist: ${req.url}`
        }
});});

router.get('/', (req, res) => { res.sendFile(`${__dirname}/src/qr.html`) });


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



module.exports = router