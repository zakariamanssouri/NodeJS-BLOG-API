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
    else {
        var payload
        try {
            payload = jwt.verify(accessToken, config.secret)
            req.body.payload = payload
            if (payload.role !== "guest")
                next()
            else res.send("you don't have access")
        } catch (error) {
            console.log(error)
            res.redirect('/')
        }

    }
}

