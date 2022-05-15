const router = require('express').Router();
const verify = require('./verifiy')
const Order = require("../models/order")
const Seller = require("../models/seller")

router.get('/orders', verify, async (req, res) => {
    Order.find({ "owner_shop": req.user._id },  {"buyer_information.full_name": 1, "date": 1}, function(err, orders) {
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
});


router.get('/orders/search', verify, async (req, res) => {
    const { id } = req.query
    Order.findOne({ "owner_shop": req.user._id, _id: id }, function(err, order) {
        if (err || !order) {
          console.log(err)
          res.status(404).send({
            "error": {
              "code": 404,
              "message": `error order not found`
            }
          })
        } else {
          return res.status(200).json(order);
        }
      });
});

router.get('/orders/query', verify, async (req, res) => {
  const { from } = req.query
  const { to } = req.query

  if(!from || !to) return res.status(400).send({"status":"error", "message": "malformed input"});

  Order.find({ "owner_shop": req.user._id, date: {$gte:parseInt(from), $lte: parseInt(to)}},{"buyer_information.full_name": 1, "date": 1},{sort: {date: 1}}, function(err, order) {
      if (err || !order) {
        console.log(err)
        res.status(404).send({
          "error": {
            "code": 404,
            "message": `no orders in this period`
          }
        })
      } else {
        return res.status(200).json(order);
      }
  });
  
});

router.get('/orders/today', verify, async (req, res) => {
  const today = Math.round(+new Date()/1000);
  console.log(today-86400)
  Order.find({ "owner_shop": req.user._id, date: {$gte:parseInt(today-86400), $lte: parseInt(today)}},{"buyer_information.full_name": 1, "date": 1},{sort: {date: 1}}, function(err, order) {
      if (err || !order) {
        console.log(err)
        res.status(404).send({
          "error": {
            "code": 404,
            "message": `no orders in this period`
          }
        })
      } else {
        return res.status(200).json(order);
      }
  });
  
});



module.exports = router