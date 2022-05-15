const mongoose = require ("mongoose")

const sellerSchema = new mongoose.Schema({
  "rapyd": {
    "secret_key": {
      "default": "none",
      "type": "Mixed"
    },
    "acces_key": {
      "default": "none",
      "type": "Mixed"
    }
  },
  "shop_data": {
    "shop_name": {
      "default": "none",
      "type": "Mixed"
    },
    "contact_mail": {
      "default": "none",
      "type": "Mixed"
    },
    "contact_number": {
      "default": "none",
      "type": "Mixed"
    },
    "shop_adress": {
      "default": "none",
      "type": "Mixed"
    },
    "privacy_policy": {
      "default": "none",
      "type": "Mixed"
    },
    "terms_and_conditions": {
      "default": "none",
      "type": "Mixed"
    }
    
  },
  "security": {
    "email": {
      "type": "String",
      "required": true,
      "min": 6,
      "max": 150
    },
    "password": {
      "type": "String",
      "required": true,
      "min": 6,
      "max": 150
    }
  }
})

module.exports = mongoose.model("seller", sellerSchema)