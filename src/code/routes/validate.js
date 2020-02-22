const Admin = require("../models/admin");
const Monitor = require("../models/monitor");
const express = require("express");
const validateRouter = express.Router();

validateRouter.post("/", function(req, res) {
  let type = req.body.type;
  if (type === "admin") {
    Admin.findOne(
      {
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
    Monitor.findOne(
      {
        username: req.body.username,
        password: req.body.password
      },
      function(err, monitor) {
        if (err) {
          res.status(400).send("unable to process request");
        } else {
          if (monitor === null) {
            res.status(200).send(false);
          } else {
            res.status(200).send(monitor);
          }
        }
      }
    );
  }
});
module.exports = validateRouter;
