const express = require("express");
const VideoRouter = express.Router();
const TargetedVideo = require("../models/TargetedVideo");

VideoRouter.get("/", function(req, res) {
  TargetedVideo.find(function(err, videos) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(videos);
    }
  });
});
VideoRouter.get("/:id", function(req, res) {
  let id = req.params.id;
  TargetedVideo.findById(id, function(err, video) {
    if (err) {
      res.status(400).send("Unable to find video of given id");
    } else {
      res.json(video);
    }
  });
});
VideoRouter.post("/", function(req, res) {
  TargetedVideo.findOne({ url: req.body.url }, function(err, video) {
    if (video != null) {
      res.status(400).send("Error");
      return;
    } else {
      let video = new TargetedVideo(req.body);
      video
        .save()
        .then(video => {
          res.status(200).send(true);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send("Error");
        });
    }
  });
});
VideoRouter.delete("/:id", function(req, res) {
  let id = req.params.id;
  TargetedVideo.findByIdAndDelete(id, function(err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(true);
    }
  });
});
VideoRouter.put("/:id", function(req, res) {
  let id = req.params.id;
  TargetedVideo.findByIdAndUpdate(id, req.body, function(err) {
    if (err) {
      res.status(400).send("Unable to update video");
    } else {
      res.status(200).send(true);
    }
  });
});
module.exports = VideoRouter;