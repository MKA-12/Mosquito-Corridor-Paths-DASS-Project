const express = require("express");
const Sensor = require("../models/sensor");
const random = require('random')

const sensorAddRouter = express.Router();
let a = 1;
async function todo() {
    let sensors = await Sensor.find()

    for (const order of sensors) {
        const Temparature = random.float(min = 17, max = 40)
        const Humidity = random.float(min = 40, max = 75)
        const date = new Date;
        const time_date = date.getDate() + "/" +
            (date.getMonth() + 1) + "/" +
            date.getFullYear()
        const time = date.getHours() + ":" +
            date.getMinutes() + ":" +
            date.getSeconds();
        const state = "green";
        const num = random.int(min = 0, max = 1);
        if (num == 0) { state = "red" }
        await Sensor.findByIdAndUpdate(order._id, { $push: { state: state, data: { "date": time_date, "time": time, "Temparature": Temparature, "Humidity": Humidity + "%" } } })
    }
}

sensorAddRouter.get('/', function(req, res) {
    Sensor.find(function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(result);
        }
    });
});

sensorAddRouter.post("/", function(req, res) {

    console.log(req.body);
    let sensor = new Sensor(req.body);
    sensor.save().then(sensor => {
            res.status(200).send(true);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Error');
        });
    // }
    // })
});
sensorAddRouter.delete("/:id", function(req, res) {
    // console.log(req);
    // console.log(req.body);
    let id = req.params.id
    Sensor.findByIdAndDelete(id)
        .then(() => {
            console.log(id, "Yeahhhhh");
        })
        .catch((err) => {
            console.log("shit" + err);
        });
});



module.exports = sensorAddRouter;