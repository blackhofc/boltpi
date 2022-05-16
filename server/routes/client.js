const router = require('express').Router();
const verify = require('./verifiy')
const Order = require("../models/order")
const Seller = require("../models/seller")

router.get('/purchases', async (req, res) => {
    const { key } = req.query
    if(!key) return res.status(400).send({"status":"error", "message": "bolt-key missing"});

    Order.find({ "buyer_information.identifier": key},  {}, function(err, orders) {
        if (err || !orders) {
          console.log(err)
          res.status(404).send({
            "error": {
              "code": 404,
              "message": `error while looking for purchases`
            }
          })
        } else {
          return res.status(200).json({"purchases": orders});
        }
      });
});

router.get('/shop/details', async (req, res) => {
  const { shop_key } = req.query
  if(!shop_key) return res.status(400).send({"status":"error", "message": "shop-key missing"});

  Seller.findOne({ "_id": shop_key },  {"security": 0, __v: 0, rapyd: 0}, function(err, seller) {
    if (err || !seller) {
      res.status(404).send({
        "error": {
          "code": 404,
          "message": err
        }
      })
    } else {
      return res.status(200).json(seller);
    }
  });
});


router.post('/purchase/create', async (req, res) => {
    const order = new Order(req.body);
    order.save(function (err, schema) {
        if (err) {
            response.status(500).send(err);
        } else {
            res.status(200).send({"status": "ok", "message:": `order ${schema._id} placed succefully` })
        }
    });
});


module.exports = router