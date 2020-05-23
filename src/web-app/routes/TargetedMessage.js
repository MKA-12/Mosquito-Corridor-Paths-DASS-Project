const express = require("express");
const MessageRouter = express.Router();
const TargetedMessage = require("../models/TargetedMessage");

MessageRouter.get("/", function(req, res) {
  TargetedMessage.find(function(err, messages) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(messages);
    }
  });
});
MessageRouter.get("/random", function(req, res) {
  TargetedMessage.find(function(err, messages) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      var message = messages[Math.floor(Math.random()*messages.length)]
      res.json(message);
    }
  });
});
MessageRouter.get("/:id", function(req, res) {
  let id = req.params.id;
  TargetedMessage.findById(id, function(err, message) {
    if (err) {
      res.status(400).send("Unable to find message of given id");
    } else {
      res.json(message);
    }
  });
});
MessageRouter.post("/", function(req, res) {
  TargetedMessage.findOne({ message: req.body.message }, function(err, message) {
    if (message != null) {
      res.status(400).send("Error");
      return;
    } else {
      let message = new TargetedMessage(req.body);
      message
        .save()
        .then(message => {
          res.status(200).send(true);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send("Error");
        });
    }
  });
});
MessageRouter.delete("/:id", function(req, res) {
  let id = req.params.id;
  TargetedMessage.findByIdAndDelete(id, function(err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(true);
    }
  });
});
MessageRouter.put("/:id", function(req, res) {
  let id = req.params.id;
  TargetedMessage.findByIdAndUpdate(id, req.body, function(err) {
    if (err) {
      res.status(400).send("Unable to update message");
    } else {
      res.status(200).send(true);
    }
  });
});
module.exports = MessageRouter;
