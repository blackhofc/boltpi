const { Timestamp } = require("mongodb")
const mongoose = require ("mongoose")

const orderSchema = new mongoose.Schema({
  "owner_shop": {
    "default": "none",
    "type": "String"
  },
  "payement_method": {
    "default": "none",
    "type": "String"
  },
  "date": {
    "default": Math.round(+new Date()/1000),
    "type": "Number"
  },
  "buyer_information": {
    "identifier": {
      "default": "none",
      "type": "String"
    },
    "full_name": {
      "default": "none",
      "type": "Mixed"
    },
    "postal_code": {
      "default": "none",
      "type": "Mixed"
    },
    "province": {
      "default": "none",
      "type": "Mixed"
    },
    "location": {
      "default": "none",
      "type": "Mixed"
    },
    "adress": {
      "default": "none",
      "type": "Mixed"
    },
    "adress_number": {
      "default": "none",
      "type": "Mixed"
    },
    "floor_or_apartment": {
      "default": "none",
      "type": "Mixed"
    },
    "between_streets": {
      "type": [
        "String"
      ]
    },
    "optional_indications": {
      "default": "none",
      "type": "Mixed"
    },
    "home_or_work": {
      "default": "none",
      "type": "Mixed"
    },
    "contact_phone": {
      "default": "none",
      "type": "Mixed"
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