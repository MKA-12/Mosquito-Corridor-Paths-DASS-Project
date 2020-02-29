const request = require("request");
const express = require("express");
const macroWeatherData = require("../models/macroWeatherData");

const macroWeatherDataRouter = express.Router();

function data_retrieve(req, res) {
    request({
        url: "http://api.openweathermap.org/data/2.5/weather?id=1269843&appid=59d2cc3b6988cf5d5ab44ab2dd6b899a",
        json: true
    }, (err, response, body) => {
        console.log(JSON.stringify(body.coord))
        let data = new macroWeatherData(body);
        data.save().then(admin => {
                // res.status(200).send(true);
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('Error');
            });
    });
    // res.status(200).send(true)
}
macroWeatherDataRouter.post("/", () => { setInterval(data_retrieve, 10000) });
module.exports = macroWeatherDataRouter;