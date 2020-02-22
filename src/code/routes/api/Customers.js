const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// const passport = require("passport");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load Customer model
const Customer = require("../../models/customer");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation

    // const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    // return res.status(400).json(errors);
    // }

    Customer.findOne({ CustomerName: req.body.CustomerName }).then(user => {
        if (user) {
            return res.status(400).json({ CustomerName: "CustomerName already exists" });
        } else {
            const NewCustomer = new Customer({
                CustomerName: req.body.CustomerName,
                CustomerPasswd: req.body.CustomerPasswd
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(NewCustomer.CustomerPasswd, salt, (err, hash) => {
                    if (err) throw err;
                    NewCustomer.CustomerPasswd = hash;
                    NewCustomer
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation

    // const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    // if (!isValid) {
    // return res.status(400).json(errors);
    // }

    const CustomerName = req.body.CustomerName;
    const CustomerPasswd = req.body.CustomerPasswd;

    // Find user by email
    Customer.findOne({ CustomerName }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ CustomerNamenotfound: "Customer Name not found" });
        }

        // Check password
        bcrypt.compare(CustomerPasswd, user.CustomerPasswd).then(isMatch => {
            if (isMatch) {
                // Customer matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.CustomerName
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
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;