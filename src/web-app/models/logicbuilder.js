const mongoose = require("mongoose");

const LogicBuilder = new mongoose.Schema({
    tempMin:{
        type: Number,
        required: true
    },
    tempMax:{
        type: Number,
        required: true
    },
    humidityMin:{
        type: Number,
        required: true
    },
    humidityMax:{
        type: Number,
        required: true
    },
    windMin:{
        type: Number,
        required: true
    },
    windMax:{
        type: Number,
        required: true
    }
});

module.exports=mongoose.model("Logic",LogicBuilder)