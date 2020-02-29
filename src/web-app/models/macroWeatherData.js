const mongoose = require("mongoose");

const MacroWeatherData = new mongoose.Schema({
    coord: {
        type: Object,
        required: true
    },
    weather: {
        type: Object,
        required: true
    },
    main: {
        type: Object,
        required: true
    },
    visibility: {
        type: Object,
        required: true
    },
    clouds: {
        type: Object,
        required: true
    },
    wind: {
        type: Object,
        required: true
    },
    dt: {
        type: Object,
        required: true
    },
    sys: {
        type: Object,
        required: true
    },
    timezone: {
        type: Object,
        required: true
    },
    id: {
        type: Object,
        required: true
    },
    name: {
        type: Object,
        required: true
    },
    cod: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("MacroWeatherData", MacroWeatherData);