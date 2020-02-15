const express = require('express'); //backend framework
const mongoose = require('mongoose'); //to interact with mongodb database
const bodyParser = require('body-parser'); //to take requests and get data from body
const cors = require('cors');
const passport = require("passport");

const items = require('./routes/api/items');
const vendors = require("./routes/api/Vendors");
const customers = require("./routes/api/Customers");

const app = express(); //initializing express into a variable named app

app.use(bodyParser.json()); //bodyparser middleware
app.use(cors());
const db = require('./config/keys').mongoURI; //config DB

mongoose.connect(db)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(morgan('tiny'));
app.use('/api/items', items);
app.use(passport.initialize()); // Passport config
require("./config/passport")(passport); // Routes
app.use("/api/Vendors", vendors);
app.use("/api/Customers", customers);
const port = 5000;
app.listen(port, () => console.log(`server started on ${port}`));