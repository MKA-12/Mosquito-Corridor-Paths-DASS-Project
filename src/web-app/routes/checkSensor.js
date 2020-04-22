const express = require("express");
const Sensor = require("../models/sensor");
const SensorCheckRoute = express.Router();
const logicBuilder = require("../models/logicbuilder");
SensorCheckRoute.get('/conducive', function (req, res) {
    Sensor.find(async function (err, result) {
        await logicBuilder.find(function (error, logic) {
            let reqLogic = logic[logic.length - 1]
            finalSensor = []
            finalFactor = []
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
                    tempMid = (reqLogic.tempMax - reqLogic.tempMin) / 2
                    humidityMid = (reqLogic.humidityMax - reqLogic.humidityMin) / 2
                    windMid = (reqLogic.windMax - reqLogic.windMin) / 2
                    tempWeightage = ((temp - tempMid) / (reqLogic.tempMax - tempMid))
                    humidityWeightage = ((hum - humidityMid) / (reqLogic.humidityMax - humidityMid))
                    windWeightage = ((wind - windMid) / (reqLogic.windMax - windMid))
                    let factor=''
                    if(tempWeightage<=(humidityWeightage)&&tempWeightage<=(windWeightage)){
                        factor='Do Thermal Fogging.'
                    }
                    else if(humidityWeightage<=(tempWeightage)&&humidityWeightage<=(windWeightage)){
                        factor='Humidity < 10% is fatal for mosquitos. Hence, the strategy is to keep the place dry.'
                    }
                    else if(windWeightage<=(humidityWeightage)&&windWeightage<=(tempWeightage)){
                        factor='Blow air at 20 mph speed.'
                    }
                    if (count >= (totalParameters / 2)) {
                        finalSensor.push(sensor)
                        finalFactor.push(factor)
                    }
                }
            }
            res.status(200).send([finalSensor,finalFactor])
        })
    })
})
SensorCheckRoute.get('/nonconducive', function (req, res) {
    Sensor.find(async function (err, result) {
        await logicBuilder.find(function (error, logic) {
            let reqLogic = logic[logic.length - 1]
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
                    if (count < (totalParameters / 2)) {
                        finalSensor.push(sensor)
                    }
                }
            }
            res.status(200).send(finalSensor)
        })
    })
})
module.exports = SensorCheckRoute;