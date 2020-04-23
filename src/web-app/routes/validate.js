const Admin = require("../models/admin");
const Monitor = require("../models/monitor");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRouter = express.Router();

validateRouter.post("/", function(req, res) {
    let type = req.body.type;
    if (type === "admin") {
        Admin.findOne({
                username: req.body.username,
                password: req.body.password
            },
            function(err, admin) {
                if (err) {
                    res.status(400).send("unable to process request");
                } else {
                    if (admin === null) {
                        res.status(200).send(false);
                    } else {
                        res.status(200).send(admin);
                    }
                }
            }
        );
    } else if (type === "monitor") {
        Monitor.findOne({ username: req.body.username }).then(monitor => {
            // Check if monitor exists
            if (monitor === null) {
                // return res.status(404).json({ MonitorNamenotfound: "Monitor Name not found" });
                res.status(200).send(false);
                return;
            }

            // Check password
            bcrypt.compare(req.body.password, monitor.password).then(isMatch => {
                if (isMatch) {
                    // Monitor matched
                    // Create JWT Payload
                    const payload = {
                        id: monitor.id,
                        name: monitor.username
                    };

                    // Sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey, {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                    res.status(200).send(monitor);
                } else {
                    res.status(200).send(false);
                }
            });
        }).catch(err => {
            console.log("err");
            res.status(400).send("unable to process request");
        })

    }
});
module.exports = validateRouter;