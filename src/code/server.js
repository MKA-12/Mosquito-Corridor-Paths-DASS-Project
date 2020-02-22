const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

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

// API endpoints
//routes
const adminRouter = require("./routes/admin");
const monitorRouter = require("./routes/monitor");
const validateRouter = require("./routes/validate");
app.use("/api/admin", adminRouter);
app.use("/api/monitor", monitorRouter);
app.use("/api/validate", validateRouter);
app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});
