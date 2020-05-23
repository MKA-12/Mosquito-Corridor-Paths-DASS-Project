const mongoose = require("mongoose");

const TargetedMessage = new mongoose.Schema({
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("TargetedMessage", TargetedMessage);
