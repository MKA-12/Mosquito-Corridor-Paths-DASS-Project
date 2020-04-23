const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Sensor = require("../models/sensor");
const logicBuilder = require("../models/logicbuilder");
const axios = require("axios");
let sensorList = [];
userRouter.get("/", function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(users);
    }
  });
});
userRouter.get("/:id", function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      res.status(400).send("Unable to find user of given id");
    } else {
      res.json(user);
    }
  });
});
userRouter.post("/", function (req, res) {
  User.findOne({ token: req.body.token }, function (err, user) {
    if (user != null) {
      res.status(400).send("Error");
      return;
    } else {
      let user = new User(req.body);
      user
        .save()
        .then((user) => {
          res.status(200).send(true);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("Error");
        });
    }
  });
});
userRouter.post("/reportLocation", function (req, res) {
  User.findOne({ token: req.body.token }, async function (err, user) {
    if (user === null) {
      res.status(200).send(false);
      return;
    } else {
      res.status(200).send(true);
      User.findByIdAndUpdate(user._id, req.body, function (err) {
        if (err) {
          console.log(err);
        }
      });
      getConduciveSensors().then(() => {
        for (sensor of sensorList) {
          lat1 = parseFloat(sensor.latitude);
          lon1 = parseFloat(sensor.longitude);
          lat2 = parseFloat(req.body.location.latitude);
          lon2 = parseFloat(req.body.location.longitude);
          var R = 6378.137; // Radius of earth in KM
          var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
          var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
              Math.cos((lat2 * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
          if (d < 16) {
            axios
              .post("https://exp.host/--/api/v2/push/send", {
                to: user.token,
                title: "Alert!",
                body: "You are in danger zone",
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          }
        }
      });
    }
  });
});
userRouter.delete("/:id", function (req, res) {
  let id = req.params.id;
  User.findByIdAndDelete(id, function (err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(true);
    }
  });
});
userRouter.put("/:id", function (req, res) {
  let id = req.params.id;
  User.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      res.status(400).send("Unable to update user");
    } else {
      res.status(200).send(true);
    }
  });
});
async function getConduciveSensors() {
  await Sensor.find(async function (err, result) {
    await logicBuilder.find(function (error, logic) {
      let reqLogic = logic[logic.length - 1];
      finalSensor = [];
      for (let sensor of result) {
        const date = new Date();
        if (sensor["data"].length == 0) continue;
        var timestr = sensor["data"][sensor["data"].length - 1]["time"];
        var timearr = timestr.split(":");
        var dbtime = timearr[0] * 3600 + timearr[1] * 60 + timearr[2];
        var datestr = sensor["data"][sensor["data"].length - 1]["date"];
        var datearr = datestr.split("/");
        var dbdate = datearr[0] + datearr[1] * 31 + datearr[2] * 12 * 31;
        if (
          date.getHours() * 3600 +
            date.getMinutes() * 60 +
            date.getSeconds() -
            dbtime <
            30 &&
          date.getDate() +
            (date.getMonth() + 1) * 31 +
            date.getFullYear() * 12 * 31 -
            dbdate <=
            1
        ) {
          temp = sensor["data"][sensor["data"].length - 1]["Temperature"];
          hum = parseFloat(
            sensor["data"][sensor["data"].length - 1]["Humidity"]
          );
          wind = sensor["data"][sensor["data"].length - 1]["windSpeed"];
          totalParameters = 3;
          count = 0;
          count = count + (temp >= reqLogic.tempMin && temp < reqLogic.tempMax);
          count =
            count +
            (hum >= reqLogic.humidityMin && hum <= reqLogic.humidityMax);
          count =
            count + (wind >= reqLogic.windMin && wind <= reqLogic.windMax);
          if (count >= totalParameters / 2) {
            finalSensor.push({
              longitude: sensor.longitude,
              latitude: sensor.latitude,
            });
          }
        }
      }
      sensorList = finalSensor;
      // return finalSensor
    });
  });
  return sensorList;
}

module.exports = userRouter;
