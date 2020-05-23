const express = require("express");
const Sensor = require("../models/sensor");
const PathRoute = express.Router();
const logicBuilder = require("../models/logicbuilder");
PathRoute.get('/', function (req, res) {
    Sensor.find(async function (err, result) {
        await logicBuilder.find(function (error, logic) {
            let reqLogic = logic[logic.length - 1]
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
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
                    wind = sensor["data"][sensor["data"].length - 1]["windSpeed"]
                    totalParameters = 3
                    count = 0
                    count = count + (temp >= reqLogic.tempMin && temp < reqLogic.tempMax)
                    count = count + (hum >= reqLogic.humidityMin && hum <= reqLogic.humidityMax)
                    count = count + (wind >= reqLogic.windMin && wind <= reqLogic.windMax)
                    if (count >= (totalParameters / 2)) {
                        finalSensor.push(sensor)
                    }
                }
            }
            allpaths = []
            for (let i in finalSensor) {
                for (let j in finalSensor) {
                    if (i <= j) {
                        continue;
                    }
                    lat1 = finalSensor[i]["latitude"]
                    lon1 = finalSensor[i]["longitude"]
                    lat2 = finalSensor[j]["latitude"]
                    lon2 = finalSensor[j]["longitude"]
                    var R = 6378.137; // Radius of earth in KM
                    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
                    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    var d = R * c
                    if (d<0.16) {
                        allpaths.push([[lon1, lat1], [lon2, lat2]])
                    }
                }
            }
            res.status(200).send(allpaths)
        }
    })
    })
})

module.exports = PathRoute;