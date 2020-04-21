const express = require('express');
const MonitorRouter = express.Router();
const Monitor = require('../models/monitor')
var crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

MonitorRouter.get('/:id', function(req, res) {
    let hashId = req.params.id
    Monitor.find(function(err, monitors) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            for (var i = 0; i < monitors.length; i++) {
                if (hashId === crypto.createHash('md5').update((monitors[i]._id).toString()).digest('hex') && monitors[i].verified === false) {
                    res.status(200).send(true);
                    return;
                }
            }
            res.status(200).send(false)
        }
    });
});
MonitorRouter.post('/', function(req, res) {
    let hashId = req.body.id
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            req.body.password = hash;
            Monitor.find(async function(err, monitors) {
                if (err) {
                    console.log(err);
                    res.status(400).send('Error');
                } else {
                    for (var i; i < monitors.length; i++) {
                        if (monitors[i].username === req.body.username) {
                            res.status(200).send(false)
                        }
                    }
                    for (var i = 0; i < monitors.length; i++) {
                        if (hashId == crypto.createHash('md5').update((monitors[i]._id).toString()).digest('hex') && monitors[i].verified == false) {
                            await Monitor.findByIdAndUpdate(monitors[i]._id, { "username": req.body.username, "password": hash, "verified": true },
                                function(err, response) {
                                    if (err) {
                                        res.status(400).send('Error');
                                        console.log(err)
                                    } else {
                                        res.status(200).send(true);
                                    }
                                })
                            return;
                        }
                    }
                    res.status(200).send(false)
                }
            });
        });
    });



})
module.exports = MonitorRouter;