const router = require('express').Router();
const verify = require('./verifiy')
const Order = require("../models/order")
const Seller = require("../models/seller")

router.get('/', verify, async (req, res) => {
    Seller.findOne({ "_id": req.user._id },  {"security.password": 0, __v: 0, rapyd: 0}, function(err, seller) {
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


router.put('/edit', verify, async (req, res) => {

    Seller.findOneAndUpdate({ "_id": req.user._id }, {"shop_data": req.body}, { upsert: true, new: true }, (error, doc) => {
        if (error || !doc) {
            return reject( error );
        }else {
            return res.status(200).send({"status": "ok","message":"succes"});
        }
    });

});


router.get('/keys', verify, async (req, res) => {
    Seller.findOne({ "_id": req.user._id },  {rapyd: 1, _id: 0 }, function(err, seller) {
        if (err || !seller) {
          res.status(404).send({
            "error": {
              "code": 404,
              "message": `Seller with id '${req.user._id}' not found`
            }
          })
        } else {
          return res.status(200).json(seller);
        }
      });
});

router.put('/keys/edit', verify, async (req, res) => {

   // if(!secret_key || !acces_key) return res.status(400).send({"status":"error", "message": "malformed input"});

    Seller.findOneAndUpdate({ "_id": req.user._id }, {"rapyd": req.body} , { upsert: true, new: true }, (error, doc) => {
        if (error || !doc) {
            return reject( error );
        }else {
            return res.status(200).send({"status": "ok","message":"succes"});
        }
    });

});


module.exports = router