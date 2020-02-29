const mongoose = require("mongoose");

const SOSReport = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: String
    }
});

module.exports = mongoose.model("SOSReport", SOSReport);