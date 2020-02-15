const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const CustomerSchema = new Schema({
    CustomerName: {
        type: String,
        required: true
    },
    CustomerPasswd: {
        type: String,
        required: true
    }
});

module.exports = Customer = mongoose.model('Customer', CustomerSchema);