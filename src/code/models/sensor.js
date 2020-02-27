const mongoose = require("mongoose");

const Sensor = new mongoose.Schema({
    id: {
        type: Number
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("Sensor", Sensor);