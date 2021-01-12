const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    
    try {

        // get token
        let token = req.header('x-auth-token');
        if(!token){
            return res.status(401).json({ errors: [{ msg: "Not authorized with token" }] });
        }
        
        // verify token
        jwt.verify(token, process.env.JWT_SECRET_STRING, (err, decode) => {
            if (err) {
                return res.status(401).json({ errors: [{ msg: "Your token is invalid." }] });
            }

            req.user = decode;
            next();
        });
        

        
    } catch (error) {
        res.status(500).json({ errors: [{ msg: 'Something went wrong.' }] });
    }

}