const mongoose = require("mongoose");

const Sensor = new mongoose.Schema({
    id: {
        type: String
            // required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    state: {
        type: String
    }
});

module.exports = mongoose.model("Sensor", Sensor);