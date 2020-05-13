// var kickbox = require("kickbox")
//   .client(
//     "live_fa70a4d10f2c08cc2759e7b103ef9c5a402f9bbee94dba4a13a298e2eb2abea4"
//   )
//   .kickbox();
const express = require("express");
const monitorRouter = express.Router();
const Monitor = require("../models/monitor");
const nodemailer = require("nodemailer");
var crypto = require("crypto");
var fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

monitorRouter.get("/", function (req, res) {
  Monitor.find(function (err, monitors) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(monitors);
    }
  });
});
monitorRouter.get("/:id", function (req, res) {
  let id = req.params.id;
  Monitor.findById(id, function (err, monitor) {
    if (err) {
      res.status(400).send("Unable to find monitor of given id");
    } else {
      res.json(monitor);
    }
  });
});
monitorRouter.post("/", function (req, res) {
  Monitor.findOne({ email: req.body.email }, async function (err, monitor) {
    if (monitor != null) {
      res.status(200).send(false);
      return;
    } else {
      // await kickbox.verify(req.body.email, async function (testErr, response) {
        // Let's see some results
        console.log(validateEmail(req.body.email));
        if (validateEmail(req.body.email) === true) {
          let monitor = new Monitor(req.body);
          monitor
            .save()
            .then(async (monitor) => {
              await Monitor.findOne({ email: req.body.email }, async function (
                newErr,
                newMonitor
              ) {
                {
                  res.status(200).send(true);
                  let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "dass94028@gmail.com",
                      pass: "harleenquinzel",
                    },
                  });
                  let info = await transporter.sendMail({
                    from: "dass94028@gmail.com", // sender address
                    to: req.body.email,
                    subject: "Login Details", // Subject line
                    html:
                      "<h2>Verify Yourself!</h2><p>http://localhost:3000/verify/" +
                      crypto
                        .createHash("md5")
                        .update(newMonitor._id.toString())
                        .digest("hex") +
                      "</p>", // plain text body
                    // html: "<h1>hello</h1>", // html body
                  });
                }
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error");
            });
        } 
        else {
          res.status(200).send(false);
        }
      // });
    }
  });
});
monitorRouter.delete("/:id", function (req, res) {
  let id = req.params.id;
  Monitor.findByIdAndDelete(id, function (err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(true);
    }
  });
});
monitorRouter.put("/:id", function (req, res) {
  let id = req.params.id;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      req.body.password = hash;
      Monitor.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
          res.status(400).send("Unable to update monitor");
        } else {
          res.status(200).send(true);
        }
      });
    });
  });
});
function validateEmail(elementValue){      
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue); 
} 
module.exports = monitorRouter;
