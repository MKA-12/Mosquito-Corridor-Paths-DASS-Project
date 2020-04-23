const express = require('express');
const Admin = require("../models/admin");
const Monitor = require("../models/monitor");
var crypto = require('crypto');
const forgotPasswordRouter = express.Router();
const nodemailer = require('nodemailer');

forgotPasswordRouter.post("/", function (req, res) {
    let type = req.body.type;
    if (type === "admin") {
        //find if username exists in admin and send mail to him
        var extractEmail, found = 0,id_admin,countForgot;
        Admin.find(async function (err, admins) {
            if (err) {
                console.log(err);
                res.status(400).send('Error');
            }
            else {
                for (var i = 0; i < admins.length; i++) {//if not found return false
                    if (admins[i].username === req.body.username) {
                        extractEmail = admins[i].email;
                        id_admin = admins[i]._id;
                        countForgot = admins[i].forgotPassCount;
                        found = 1
                    }
                }
                if (found === 0) {
                    res.status(200).send(false);
                    return;
                }
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "dass94028@gmail.com",
                        pass: "harleenquinzel",
                    },
                });
                let info = await transporter.sendMail({
                    from: "dass94028@gmail.com", // sender address
                    to: extractEmail,
                    subject: "Reset Password", // Subject line
                    text: "http://localhost:3000/resetPassword/" + crypto.createHash('md5').update((id_admin+countForgot).toString()).digest('hex'), // plain text body
                    // html: "<h1>hello</h1>", // html body
                },function(errNew,cool){
                    res.status(200).send(true);
                })
            }
        })
        
    }
    else if (type === "monitor") {
        var extractEmail, found = 0,id_monitor,countForgot;

        Monitor.find(async function (err, monitors) {
            if (err) {
                console.log(err);
                res.status(400).send('Error');
            }
            else {
                for (var i = 0; i < monitors.length; i++) {//if not found return false
                    if (monitors[i].username === req.body.username) {
                        extractEmail = monitors[i].email;
                        id_monitor = monitors[i]._id;
                        countForgot = monitors[i].forgotPassCount;
                        found = 1
                    }
                }
                if (found == 0) {
                    res.status(200).send(false);
                    return;
                }
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "dass94028@gmail.com",
                        pass: "harleenquinzel",
                    },
                });
                let info = await transporter.sendMail({
                    from: "dass94028@gmail.com", // sender address
                    to: extractEmail,
                    subject: "Reset Password link", // Subject line
                    text: "http://localhost:3000/resetPassword/" + crypto.createHash('md5').update((id_monitor+countForgot).toString()).digest('hex'), // plain text body
                    // html: "<h1>hello</h1>", // html body
                },function(errNew,cool){
                    res.status(200).send(true);
                })
            }
        })
    }
});

module.exports = forgotPasswordRouter;