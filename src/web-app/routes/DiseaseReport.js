const express = require("express");
const DiseaseReportRouter = express.Router();
const DiseaseReport = require("../models/DiseaseReport");
const axios = require("axios");
DiseaseReportRouter.get("/", function (req, res) {
  DiseaseReport.find(function (err, reports) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(reports);
    }
  });
});
DiseaseReportRouter.get("/:id", function (req, res) {
  let id = req.params.id;
  DiseaseReport.findById(id, function (err, report) {
    if (err) {
      res.status(400).send("Unable to find report of given id");
    } else {
      res.json(report);
    }
  });
});
DiseaseReportRouter.post("/", function (req, res) {
  // let Report = new DiseaseReport(req.body);
  // axios.get("")
  if (
    req.body["diseaseName"] != undefined &&
    req.body["location"] != undefined
  ) {
    const location = req.body.location;
    if (
      location["latitude"] != undefined &&
      location["longitude"] != undefined
    ) {
      axios
        .get(
          "https://geocode.xyz/" +
            location.latitude +
            "," +
            location.longitude +
            "?geoit=json"
        )
        .then((out) => {
          const ReportBody = {
            diseaseName: req.body["diseaseName"],
            area: out.data.staddress + " , " + out.data.postal + ".",
          };
          let Report = new DiseaseReport(ReportBody);
          Report.save()
            .then((report) => {
              res.status(200).send(true);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send("Error");
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("Error");
        });
    } else {
      res.status(400).send("Error");
    }
  } else {
    res.status(400).send("Error");
  }
});
DiseaseReportRouter.delete("/:id", function (req, res) {
  let id = req.params.id;
  DiseaseReport.findByIdAndDelete(id, function (err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(true);
    }
  });
});
DiseaseReportRouter.put("/:id", function (req, res) {
  let id = req.params.id;
  DiseaseReport.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      res.status(400).send("Unable to update report");
    } else {
      res.status(200).send(true);
    }
  });
});
module.exports = DiseaseReportRouter;
