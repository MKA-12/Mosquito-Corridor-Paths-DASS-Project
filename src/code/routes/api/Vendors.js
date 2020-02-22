const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// const passport = require("passport");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load Vendor model
const Vendor = require("../../models/vendor");

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

    Vendor.findOne({ VendorName: req.body.VendorName }).then(user => {
        if (user) {
            return res.status(400).json({ VendorName: "VendorName already exists" });
        } else {
            const NewVendor = new Vendor({
                VendorName: req.body.VendorName,
                VendorPasswd: req.body.VendorPasswd
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(NewVendor.VendorPasswd, salt, (err, hash) => {
                    if (err) throw err;
                    NewVendor.VendorPasswd = hash;
                    NewVendor
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

    const VendorName = req.body.VendorName;
    const VendorPasswd = req.body.VendorPasswd;

    // Find user by email
    Vendor.findOne({ VendorName }).then(user => {
            // Check if user exists
            // if (!user) {
            //     return res.status(404).json({ VendorNamenotfound: "Vendor Name not found" });
            // }

            // // Check password
            // bcrypt.compareSync(VendorPasswd, user.VendorPasswd).then(isMatch => {
            //     if (isMatch) {
            //         // Vendor matched
            //         // Create JWT Payload
            //         const payload = {
            //             id: user.id,
            //             name: user.VendorName
            //         };

            //         // Sign token
            //         jwt.sign(
            //             payload,
            //             keys.secretOrKey, {
            //                 expiresIn: 31556926 // 1 year in seconds
            //             },
            //             (err, token) => {
            //                 res.json({
            //                     success: true,
            //                     token: "Bearer " + token
            //                 });
            //             }
            //         );
            //         res.send(token);
            //         return res.status(200).json({ passwordMatched: "Succesfully LoggedIn" });
            //         console.log("Matched");
            //     } else {
            //         res.send('error' + err);
            //         return res
            //             .status(400)
            //             .json({ passwordincorrect: "Password incorrect" });
            //     }
            // });
            if (user) {
                if (bcrypt.compareSync(VendorPasswd, user.VendorPasswd)) {
                    const payload = {
                        id: user.id,
                        name: user.VendorName
                    };
                    let token = jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 31556926
                    });
                    res.send(token);
                    // localStorage.setItem('usertoken', res.data);
                    // this.props.history.push('/Listing');
                    console.log("Vendor exists");

                } else {
                    res.json({ error: "Vendor doesnt exists" });
                    console.log("Vendor doesnt exists");
                }
            } else {
                res.json({ error: "Vendor doesnt exists" });
                console.log("Vendor doesnt exists");
            }

        })
        .catch(err => {
            res.send("error: " + err);
        })
});

router.get("/profile", (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], keys.secretOrKey);
    Vendor.findOne({
            _id: decoded._id
        })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.send("Vendor doesnt exist");
            }
        })
        .catch(err => {
            res.send("error: " + err);
        })
})

module.exports = router;