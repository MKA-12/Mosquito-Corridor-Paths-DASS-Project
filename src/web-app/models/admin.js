const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email : {
    type : String,
    required: true
  },
  forgotPassCount :{
    type : Number,
    required:true
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
