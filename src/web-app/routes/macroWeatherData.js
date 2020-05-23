const request = require("request");
const express = require("express");
const macroWeatherData = require("../models/macroWeatherData");

const macroWeatherDataRouter = express.Router();

macroWeatherDataRouter.get('/', function(req, res) {
    macroWeatherData.find(function(err, result) {
        // res.status(200).send(true)
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(result);
        }
    })
})

macroWeatherDataRouter.put('/', function(req, res) {
    macroWeatherData.find({ date: { $gte: req.body.fromDate ,$lte: req.body.toDate } }, function(err, result) {
        // res.status(200).send(true)
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(result);
        }
    })
})

module.exports = macroWeatherDataRouter;