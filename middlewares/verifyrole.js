const jwt = require('jsonwebtoken')
const config = require('../config/config.json')


exports.verifyrole = function (req, res, next) {

    let accessToken = req.cookies.token;
    let payload = jwt.verify(accessToken, config.secret)
    if (payload.role == "admin" || payload.role == "author") {
        next()
    }
    else res.send("you don't have acess")
}