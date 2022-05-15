const jwt = require('jsonwebtoken')


module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({"status": "error", "message": "you dont have permission to make this action"})

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){ return res.status(400).send({"status": "error", "message": "invalid token"}) }

}