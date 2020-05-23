const express = require('express');
const LogicBuilder = require("../models/logicbuilder");
const LogicBuilderRouter = express.Router();
LogicBuilderRouter.get('/', function (req, res) {
    LogicBuilder.find(function (err, logic) {
        if (err) {
            res.status(400).send("Unable to find report of given id")
        }
        else {
            res.status(200).send(logic[logic.length - 1])
        }
    });
});
LogicBuilderRouter.post('/', function (req, res) {
    let logic = new LogicBuilder(req.body);
    logic.save().then(LogicBuilder => {
        res.status(200).send(true);
    })
    .catch(err => {
        console.log(err)
        res.status(400).send('Error');
    });
});
module.exports = LogicBuilderRouter;