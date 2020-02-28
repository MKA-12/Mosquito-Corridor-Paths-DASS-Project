const express = require("express");
const Sensor = require("../models/sensor");
const random = require('random')

const sensorAddRouter = express.Router();

sensorAddRouter.post("/", function(req, res) {
    // Sensor.findOne({ id: req.body.id }, { latitude: req.body.latitude }, { longitude: req.body.longitude }, { data: [] }, function(err, sensor) {
    //     if (sensor != null) {
    //         res.status(400).send('Error');
    //         return;
    //     } else {
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
sensorAddRouter.delete("/", function(req, res) {
    console.log(req);
    console.log(req.body.latitude);
    Sensor.findOneAndDelete({ latitude: req.body.latitude })
        .then(() => {
            console.log("Yeahhhhh");
        })
        .catch((err) => {
            console.log("shit" + err);
        });
    // console.log("Yeahhhhh" + items[i]);
});
sensorAddRouter.put("/", function(req, res) {
    // Sensor.find()
    //     .then((items) => {
    //         res.json(items);
    //         let i = 0;
    //         console.log(items);
    //         for (i = 0; i < items.length; i++) {
    const Temparature = random.float(min = 17, max = 40)
    const Humidity = random.float(min = 40, max = 75)
    const date = new Date;
    // const time = date.toUTCString();
    const time = "Last Sync: " + date.getDate() + "/" +
        (date.getMonth() + 1) + "/" +
        date.getFullYear() + " @ " +
        date.getHours() + ":" +
        date.getMinutes() + ":" +
        date.getSeconds();
    Sensor.findByIdAndUpdate(req.body.id, { $push: { data: { time, "Temparature": Temparature, "Humidity": Humidity + "%" } } })
        .then(() => {
            console.log("Updated")
            res.status(200).send(true);
        })
        // }
        // });
});


// Sensor.find()
//     .then((items) => {
//         res.json(items);
//         let i = 0;
//         console.log(items);
//         for (i = 0; i < items.length;) {
//             const updatedData = random.float(min = 17, max = 40)
//             console.log("k", items[i]._id)
//             let data = {
//                 data: [1, 2]
//             }
//             console.log(req.body);
//             // Sensor.findByIdAndDelete(items[i].id, req.body, function(err, result) {
//             //     if (err) {
//             //         console.log(err);
//             //     }
//             //     console.log("RESULT: " + result);
//             //     i++;
//             //     // res.send('Done')
//             // });
//             Sensor.findByIdAndDelete(items[i]._id)
//                 .then(() => {
//                     i++;
//                     // console.log("Updated") 
//                 })
//                 //[...items[i].data, updatedData]
//         }
//     }).catch((error) => {
//         console.log('error: ', error);
//     });
// });
module.exports = sensorAddRouter;