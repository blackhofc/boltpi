const { Timestamp } = require("mongodb")
const mongoose = require ("mongoose")
const orderSchema = new mongoose.Schema({
  "owner_shop": {
    "default": "",
    "type": "String"
  },
  "payment_method": {
    "default": "",
    "type": "String"
  },
  "date": {
    "default": Math.round(+new Date()/1000),
    "type": "String"
  },
  "buyer_information": {
    "identifier": {
      "default": "",
      "type": "String"
    },
    "full_name": {
      "default": "",
      "type": "String"
    },
    "postal_code": {
      "default": "",
      "type": "String"
    },
    "location": {
      "default": "",
      "state": {
        "default": "",
        "type": "String"
      },
      "city": {
        "default": "",
        "type": "String"
      },
      "country": {
        "default": "",
        "type": "String"
      }
    },
    "address": {
      "default": "",
      "type": "String"
    },
    "optional_indications": {
      "default": "",
      "type": "String"
    }
  },
  "cart": {
    "type": [
      "Mixed"
    ]
  }
})
//ItemSchema.set('timestamps', true);

module.exports = mongoose.model("order", orderSchema)