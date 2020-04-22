const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
const Sensor = require("./models/sensor");
const random = require('random')
const request = require("request");
const StoreThingSpeakData = require("./scraping");
const app = express();
const PORT = 4000;
const macroWeatherData = require("./models/macroWeatherData");
app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/Dass45", {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established succesfully.");
});

function data_retrieve(req, res) {
    request({
        url: "http://api.openweathermap.org/data/2.5/weather?id=1269843&appid=59d2cc3b6988cf5d5ab44ab2dd6b899a",
        json: true
    }, (err, response, body) => {
        if (body !== undefined) {
            // console.log(JSON.stringify(body.coord))
            const date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);;
            const time_date = date.getFullYear() + "/" +
                (date.getMonth() + 1) + "/" +
                date.getDate()
            const time = date.getHours() + ":" +
                date.getMinutes() + ":" +
                date.getSeconds();
            body.time = time;
            // body.date = date;
            body.date = time_date;
            let data = new macroWeatherData(body);
            data.save().then(admin => {
                    // res.status(200).send(true);
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send('Error');
                });
        }
        else{
            console.log("internet issue")
        }
    });
    // res.status(200).send(true)
}
async function todo() {
    // try {
    let sensors = await Sensor.find()

    for (const order of sensors) {
        const Temparature = random.float(min = 17, max = 40)
        const Humidity = random.float(min = 40, max = 75)
        const windSpeed =random.float(min=2, max=16)
        const date = new Date;
        const time_date = date.getDate() + "/" +
            (date.getMonth() + 1) + "/" +
            date.getFullYear()
        const time = date.getHours() + ":" +
            date.getMinutes() + ":" +
            date.getSeconds();
        const num = random.int(min = 0, max = 1);
        await Sensor.findByIdAndUpdate(order._id, { $push: { data: { "date": time_date, "state": num, "time": time, "Temperature": Temparature, "Humidity": Humidity + "%", "windSpeed":windSpeed } } })
    }
}
// API endpoints
//routes
// setInterval(StoreThingSpeakData, 15000)
setInterval(data_retrieve, 15000)
setInterval(todo, 15000)
const diseaseRouter = require("./routes/DiseaseReport");
const adminRouter = require("./routes/admin");
const monitorRouter = require("./routes/monitor");
const validateRouter = require("./routes/validate");
const macroWeatherDataRouter = require("./routes/macroWeatherData");
const sensorAddRouter = require("./routes/addSensor");
const SOSReportRouter = require("./routes/SOSReport");
const MessageRouter = require("./routes/TargetedMessage");
const VideoRouter = require("./routes/TargetedVideo");
const userRouter = require("./routes/user")
const sensorCheckRouter = require("./routes/checkSensor")
const PathRouter = require("./routes/path")
const LogicBuilderRouter = require("./routes/logicBuilder")
const VerificationRouter = require("./routes/verification")
const ForgotPasswordRouter = require("./routes/forgotPassword")
const ResetPasswordRouter = require("./routes/resetPassword")
app.use("/api/diseaseReport", diseaseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/monitor", monitorRouter);
app.use("/api/validate", validateRouter);
app.use("/api/macroWeatherData", macroWeatherDataRouter);
app.use("/api/addSensor", sensorAddRouter);
app.use("/api/SOSReport", SOSReportRouter);
app.use("/api/TargetedVideo", VideoRouter);
app.use("/api/TargetedMessage", MessageRouter);
app.use("/api/Notify",userRouter);
app.use("/api/getSensor",sensorCheckRouter);
app.use("/api/logic",LogicBuilderRouter);
app.use("/api/getPath",PathRouter);
app.use("/api/verify", VerificationRouter);
app.use("/api/forgotPassword",ForgotPasswordRouter);
app.use("/api/resetPassword" , ResetPasswordRouter);
app.use('/static', express.static(path.join(__dirname, 'static')))
app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});