const userRepo = require('../repositories/users')
const jwt = require('jsonwebtoken');
const config = require('../config/config.json')

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const retreivedUser = await userRepo.getUserByEmail(email)
    if (!retreivedUser || !email || !password || retreivedUser.password !== password) {
        res.status(403).send("your email or password is incorrect")
    }
    let payload = { username: retreivedUser.dataValues.username, role: retreivedUser.dataValues.role }
    req.body.payload = payload;
    let accessToken = jwt.sign(payload, config.secret, { expiresIn: '5s' })
    res.cookie("token", accessToken)
    res.redirect('http://localhost:3000/dashbord')
}