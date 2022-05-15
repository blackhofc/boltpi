const mongoose = require ("mongoose")

const orderSchema = new mongoose.Schema({
  "buyer_key": {
    "type": "String"
  },
  "shop_key": {
    "type": "String"
  },
  "payement_method": {
    "type": "String"
  },
  "payement_date": {
    "type": "String"
  },
  "buyer_information": {
    "full_name": {
      "type": "String"
    },
    "postal_code": {
      "type": "Date"
    },
    "province": {
      "type": "String"
    },
    "location": {
      "type": "String"
    },
    "adress": {
      "type": "String"
    },
    "adress_number": {
      "type": "Date"
    },
    "floor_or_apartment": {
      "type": "String"
    },
    "between_streets": {
      "type": [
        "String"
      ]
    },
    "optional_indications": {
      "type": "String"
    },
    "home_or_work": {
      "type": "String"
    },
    "contact_phone": {
      "type": "String"
    }
  },
  "cart": {
    "type": [
      "Mixed"
    ]
  }
})

module.exports = mongoose.model("order", orderSchema)