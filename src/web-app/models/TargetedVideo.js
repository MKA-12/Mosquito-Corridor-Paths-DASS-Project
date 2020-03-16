const mongoose = require("mongoose");

const TargetedVideo = new mongoose.Schema({
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("TargetedVideo", TargetedVideo);
