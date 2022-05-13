const express = require("express")
const Seller = require("./Schemas/seller") 
const router = express.Router()

router.get("/sellers", async (req, res) => {
	const seller = await Seller.find()
	res.send(seller)
})

router.get('/awas', (req, res) => {
    res.send({
        "status": "ok",
        "send to": "asd"
    })
});


router.get("/key/:id", async (req, res) => {
	const seller = await Seller.findOne({ _id: req.params.id })
  if(seller){
    res.send(seller)
  }else{
    res.status(404).send({
      "error": {
        "code": 404,
        "message": `Seller ${req.params.id} not found`
      }
    })
  }
})


router.get('*', function(req, res){
    res.status(404).send({
        "error": {
          "code": 404,
          "message": `Some of the aliases you requested do not exist: ${req.url}`
        }
});});

module.exports = router