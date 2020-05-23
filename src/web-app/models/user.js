const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  location:{
    type: Object
  }
});

module.exports = mongoose.model("User", UserSchema);
