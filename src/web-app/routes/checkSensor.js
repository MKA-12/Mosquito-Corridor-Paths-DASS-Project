const express = require("express");
const Sensor = require("../models/sensor");
const SensorCheckRoute = express.Router();

SensorCheckRoute.get('/conducive', function (req, res) {
    Sensor.find(function (err, result) {
        finalSensor = []
        for (let sensor of result) {
            const date = new Date;
            if (sensor["data"].length == 0)
                continue;
            var timestr = sensor["data"][sensor["data"].length - 1]["time"]
            var timearr = timestr.split(":")
            var dbtime = timearr[0] * 3600 + timearr[1] * 60 + timearr[2]
            var datestr = sensor["data"][sensor["data"].length - 1]["date"]
            var datearr = datestr.split("/")
            var dbdate = datearr[0] + datearr[1] * 31 + datearr[2] * 12 * 31
            if (((date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() - dbtime) < 30) && ((date.getDate() + (date.getMonth() + 1) * 31 + date.getFullYear() * 12 * 31 - dbdate) <= 1)) {
                temp = sensor["data"][sensor["data"].length - 1]["Temperature"]
                hum = parseFloat(sensor["data"][sensor["data"].length - 1]["Humidity"])
                if (temp > 16 && temp < 32 && hum > 60) {
                    finalSensor.push(sensor)
                }
            }
        }
        res.status(200).send(finalSensor)
    })
})
SensorCheckRoute.get('/nonconducive', function (req, res) {
    Sensor.find(function (err, result) {
        finalSensor = []
        for (let sensor of result) {
            const date = new Date;
            if (sensor["data"].length == 0)
                continue;
            var timestr = sensor["data"][sensor["data"].length - 1]["time"]
            var timearr = timestr.split(":")
            var dbtime = timearr[0] * 3600 + timearr[1] * 60 + timearr[2]
            var datestr = sensor["data"][sensor["data"].length - 1]["date"]
            var datearr = datestr.split("/")
            var dbdate = datearr[0] + datearr[1] * 31 + datearr[2] * 12 * 31
            if (((date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() - dbtime) < 30) && ((date.getDate() + (date.getMonth() + 1) * 31 + date.getFullYear() * 12 * 31 - dbdate) <= 1)) {
                temp = sensor["data"][sensor["data"].length - 1]["Temperature"]
                hum = parseFloat(sensor["data"][sensor["data"].length - 1]["Humidity"])
                if (!(temp > 16 && temp < 32 && hum > 60)) {
                    finalSensor.push(sensor)
                }
            }
        }
        res.status(200).send(finalSensor)
    })
})
module.exports = SensorCheckRoute;