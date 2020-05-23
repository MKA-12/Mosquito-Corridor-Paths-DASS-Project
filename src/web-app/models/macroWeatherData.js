const mongoose = require("mongoose");

const MacroWeatherData = new mongoose.Schema({
    time:{
        type: String
    },
    date:{
        type:Date
    },
    coord: {
        type: Object
    },
    weather: {
        type: Object
    },
    main: {
        type: Object
    },
    visibility: {
        type: Object
    },
    clouds: {
        type: Object
    },
    wind: {
        type: Object
    },
    dt: {
        type: Object
    },
    sys: {
        type: Object
    },
    timezone: {
        type: Object
    },
    id: {
        type: Object
    },
    name: {
        type: Object
    },
    cod: {
        type: Object
    }
});

module.exports = mongoose.model("MacroWeatherData", MacroWeatherData);