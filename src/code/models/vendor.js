const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const VendorSchema = new Schema({
    VendorName: {
        type: String,
        required: true
    },
    VendorPasswd: {
        type: String,
        required: true
    }
});

module.exports = Vendor = mongoose.model('Vendor', VendorSchema);