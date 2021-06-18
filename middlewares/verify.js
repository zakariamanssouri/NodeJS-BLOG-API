const { log } = require('debug');
var express = require('express');
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')



exports.verify = function (req, res, next) {
    let accessToken = req.cookies.token

    if (!accessToken) {
        console.log("don't have access")
        res.redirect('/')
    }

    var payload
    try {
        payload = jwt.verify(accessToken, config.secret)
        req.body.payload = payload
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    next()
}

