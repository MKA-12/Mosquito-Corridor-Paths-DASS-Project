const express = require('express');
const SOSReportRouter = express.Router();
const SOSReport = require('../models/SOSReport')
SOSReportRouter.get('/', function (req, res) {
    SOSReport.find(function (err, reports) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            res.json(reports);
        }
    });
});
SOSReportRouter.get(('/:id'), function (req, res) {
    let id = req.params.id;
    SOSReport.findById(id, function (err, report) {
        if (err) {
            res.status(400).send("Unable to find report of given id")
        } else {
            res.json(report);
        }
    });
});
SOSReportRouter.post(('/'), function (req, res) {
    SOSReport.findOne({longitude: req.body.longitude, latitude: req.body.latitude},function(err,report){
        if(report != null){
            res.status(200).send(false);
            return;
        }
        else{
            let Report = new SOSReport(req.body);
            Report.save().then(report => {
            res.status(200).send(true);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Error');
        });
        }
    })
    
});
SOSReportRouter.delete(('/:id'), function (req, res) {
    let id = req.params.id;
    SOSReport.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Error');
        } else {
            res.status(200).send(true);
        }
    });
});
SOSReportRouter.put('/:id', function (req, res) {
    let id = req.params.id;
    SOSReport.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            res.status(400).send('Unable to update report');
        } else {
            res.status(200).send(true);
        }
    });
});
module.exports = SOSReportRouter;