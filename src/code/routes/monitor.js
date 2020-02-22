const express = require('express');
const monitorRouter = express.Router();
const Monitor = require('../models/monitor')
monitorRouter.get('/', function (req, res) {
    Monitor.find(function (err, monitors) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(monitors);
        }
    });
});
monitorRouter.get(('/:id'), function (req, res) {
    let id = req.params.id;
    Monitor.findById(id, function (err, monitor) {
        if (err) {
            res.status(400).send("Unable to find monitor of given id")
        } else {
            res.json(monitor);
        }
    });
});
monitorRouter.post(('/'), function (req, res) {
    Monitor.findOne({username: req.body.username},function(err,monitor){
        if(monitor != null){
            res.status(400).send('Error');
            return;
        }
        else{
            let monitor = new Monitor(req.body);
            monitor.save().then(monitor => {
            res.status(200).send(true);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Error');
        });
        }
    })
    
});
monitorRouter.delete(('/:id'), function (req, res) {
    let id = req.params.id;
    Monitor.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Error');
        } else {
            res.status(200).send(true);
        }
    });
});
monitorRouter.put('/:id', function (req, res) {
    let id = req.params.id;
    Monitor.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            res.status(400).send('Unable to update monitor');
        } else {
            res.status(200).send(true);
        }
    });
});
module.exports = monitorRouter;