const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = function (req, res, next) {

    //get token
    const token = req.header('x-auth-token');


    //check if token is present
    if (!token) {
        return res.status(401).json({ msg: "No token , authorization denied" });
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret)
        req.user = decoded.user;
        next();

    } catch (err) {

        res.status(401).json({ msg: "Token is not valid" })
    }
}