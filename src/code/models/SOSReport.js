const mongoose = require("mongoose");

const SOSReport = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    expire_at: {
        type: Date,
        default: Date.now,
        expires: 1800
    }
});

module.exports = mongoose.model("SOSReport", SOSReport);