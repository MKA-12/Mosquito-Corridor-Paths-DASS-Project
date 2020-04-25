const express = require("express");
const Sensor = require("../models/sensor");
const random = require("random");
const axios = require("axios");
const sensorAddRouter = express.Router();
sensorAddRouter.get("/", function (req, res) {
  Sensor.find(function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(result);
    }
  });
});

sensorAddRouter.post("/", async function (req, res) {
  // console.log(
  //   await CheckAllChannelIDS(req.body.channelId, req.body.channelKey)
  // );
  CheckAllChannelIDS(req.body.channelId, req.body.channelKey).then(function(response) {
    // console.log(response)
    if(response===true){
    const Temparature = random.float((min = 17), (max = 40));
    const Humidity = random.float((min = 40), (max = 75));
    const windSpeed = random.float((min = 2), (max = 16));
    const date = new Date();
    const time_date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const num = random.int((min = 0), (max = 1));
    const sensorObj = {
      ...req.body,
      data: {
        date: time_date,
        state: num,
        time: time,
        Temperature: Temparature,
        Humidity: Humidity + "%",
        windSpeed: windSpeed,
      },
    };
    let sensor = new Sensor(sensorObj);
    sensor
      .save()
      .then((sensor) => {
        res.status(200).send(true);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Error");
      });
  } else {
    res.status(200).send(false);
  }
})
});
sensorAddRouter.delete("/:id", function (req, res) {
  let id = req.params.id;
  Sensor.findByIdAndDelete(id).catch((err) => {
    console.log(err);
  });
});

sensorAddRouter.put("/export", function (req, res) {
  Sensor.findById(req.body.id, function (err, result) {
    exportdata = [];
    fromparts = req.body.fromDate.split("-");
    toparts = req.body.toDate.split("-");
    let fromDate = new Date(
      Number(fromparts[0]) +
        "/" +
        Number(fromparts[1]) +
        "/" +
        Number(fromparts[2])
    );
    let toDate = new Date(
      Number(toparts[0]) + "/" + Number(toparts[1]) + "/" + Number(toparts[2])
    );
    for (let data of result["data"]) {
      if (isNaN(data["date"])) {
        dataparts = data["date"].toString().split("/");
        let dataDate = new Date(
          dataparts[2] + "/" + dataparts[1] + "/" + dataparts[0]
        );
        if (fromDate <= dataDate && dataDate <= toDate) {
          exportdata.push(data);
        }
      }
    }
    res.status(200).send(exportdata);
  });
});

async function CheckAllChannelIDS(ID, Key) {
  Temp_URL =
    "https://api.thingspeak.com/channels/" +
    ID +
    "/fields/1.json?api_key=" +
    Key +
    "&results=1";
  console.log(Temp_URL);
  return axios
    .get(Temp_URL)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = sensorAddRouter;
