const mongoose = require ("mongoose")

const sellerSchema = new mongoose.Schema({
  "rapyd": {
    "secret_key": {
      "type": "Mixed"
    },
    "acces_key": {
      "type": "Mixed"
    }
  },
  "shop_data": {
    "shop_name": {
      "type": "Mixed"
    },
    "contact_mail": {
      "type": "Mixed"
    },
    "contact_number": {
      "type": "Mixed"
    },
    "shop_adress": {
      "type": "Mixed"
    },
    "username": {
      "type": "Mixed"
    },
    "password": {
      "type": "Mixed"
    }
  },
  "orders": {
    "type": "Array"
  }
})

module.exports = mongoose.model("seller", sellerSchema)