const express = require('express');
const Admin = require("../models/admin");
const Monitor = require("../models/monitor");
var crypto = require('crypto');
const resetPasswordRouter = express.Router();

resetPasswordRouter.get('/:id', async function (req, res) {
    let hashId = req.params.id
    var check = 0;
    // console.log(hashId)
    await Monitor.find(async function (err, monitors) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        }
        else {
            for (var i = 0; i < monitors.length; i++) {
                if (hashId == crypto.createHash('md5').update((monitors[i]._id + monitors[i].forgotPassCount).toString()).digest('hex')) {
                    check = 1
                    res.status(200).send(true);
                    return;
                }
            }
            await Admin.find(function (err, admins) {
                if (err) {
                    console.log(err);
                    res.status(400).send('Error');
                } else {
                    for (var i = 0; i < admins.length; i++) {
                        if (hashId === crypto.createHash('md5').update((admins[i]._id + admins[i].forgotPassCount).toString()).digest('hex')) {
                            check = 1;
                            res.status(200).send(true);
                            return;
                        }
                    }

                }

            });
        }
    })
    .then((error, empty) => {
        if (check === 0) {
            res.status(200).send(false)
        }
    })
})

resetPasswordRouter.post('/', function (req, res) {
    let hashId = req.body.id;
    var monitorFound = 0
    Monitor.find(async function (err, monitors) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            for (var i = 0; i < monitors.length; i++) {
                if (hashId == crypto.createHash('md5').update((monitors[i]._id + monitors[i].forgotPassCount).toString()).digest('hex')) {
                    monitorFound = 1
                    Monitor.findByIdAndUpdate(monitors[i]._id, { "password": req.body.password, "forgotPassCount": monitors[i].forgotPassCount + 1 },
                        function (err, response) {
                            if (err) {
                                res.status(400).send('Error');
                                console.log(err)
                            }
                            else {
                                res.status(200).send(true);
                            }
                        })

                }
            }
            await Admin.find(async function (err, admins) {
                if (err) {
                    console.log(err);
                    res.status(400).send('Error');
                } else {
                    for (var i = 0; i < admins.length; i++) {
                        if (hashId == crypto.createHash('md5').update((admins[i]._id + admins[i].forgotPassCount).toString()).digest('hex')) {
                            await Admin.findByIdAndUpdate(admins[i]._id, { "password": req.body.password, "forgotPassCount": admins[i].forgotPassCount + 1 },
                                function (err, response) {
                                    if (err) {
                                        res.status(400).send('Error');
                                        console.log(err)
                                    }
                                    else {
                                        res.status(200).send(true);
                                    }
                                })
                            return;
                        }
                    }
                    if (monitorFound === 0)
                        res.status(200).send(false)
                }
            }

            );
        }
    })

})






module.exports = resetPasswordRouter;