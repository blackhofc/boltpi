const router = require('express').Router();
const verify = require('./verifiy')
const Order = require("../models/order")

router.get('/pucharses', async (req, res) => {
    const { key } = req.query
    if(!key) return res.status(400).send({"status":"error", "message": "bolt-key missing"});

    Order.find({ "buyer_information.identifier": key},  {}, function(err, orders) {
        if (err || !orders) {
          console.log(err)
          res.status(404).send({
            "error": {
              "code": 404,
              "message": `error while looking for pucharses`
            }
          })
        } else {
          return res.status(200).json({"pucharses": orders});
        }
      });
});


router.post('/pucharse/create', async (req, res) => {
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