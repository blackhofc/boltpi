const router = require('express').Router();
const Seller = require('../models/seller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation } =  require('../validation');

router.post('/signup', async (req, res) => {

    const { error}  = registerValidation(req.body);

    if(error) return res.status(400).send({"status":"error", "message": error.details[0].message});

    const emailExist = await Seller.findOne({"security.email": req.body.email})

    if (emailExist) return res.status(400).send({"status":"error", "message": "email already in use"});

    const salt = await bcrypt.genSalt(10);
    const hashedPw  = await bcrypt.hash(req.body.password, salt);

    const seller = new Seller({
        "security.email": req.body.email,
        "security.password": hashedPw
    });

    
    seller.save(function (err, schema) {
        if (err) {
            response.status(500).send(err);
        } else {
            res.status(200).send({"status": "ok", "message:": `user ${schema._id} created succefully` })
        }
    });
});


router.post('/signin', async (req, res) => {
    const { error}  = registerValidation(req.body);
    if(error) return res.status(400).send({"status":"error", "message": error.details[0].message});

    const seller = await Seller.findOne({"security.email": req.body.email})

    if (!seller) return res.status(400).send({"status":"error", "message": "this email is not registed"});

    const validPass = await bcrypt.compare(req.body.password, seller.security.password);

    if(!validPass) return res.status(400).send({"status":"error", "message": "invalid password"}); 

    const token = jwt.sign({ _id: seller._id }, process.env.TOKEN_SECRET); 
    res.header('auth-token', token);
    res.send({"status": "ok", "message": `user ${seller._id} authenticated` })
});

module.exports = router