const mongoose = require("mongoose");

const DiseaseReport = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: String
    }
});

module.exports = mongoose.model("DiseaseReport", DiseaseReport);