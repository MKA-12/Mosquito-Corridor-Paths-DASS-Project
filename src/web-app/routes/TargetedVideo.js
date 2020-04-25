const axios = require("axios");
const express = require("express");
const VideoRouter = express.Router();
const TargetedVideo = require("../models/TargetedVideo");

VideoRouter.get("/", function (req, res) {
  TargetedVideo.find(function (err, videos) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(videos);
    }
  });
});
VideoRouter.get("/random", function (req, res) {
  TargetedVideo.find(function (err, videos) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      var video = videos[Math.floor(Math.random() * videos.length)];
      res.json(video);
    }
  });
});
VideoRouter.get("/:id", function (req, res) {
  let id = req.params.id;
  TargetedVideo.findById(id, function (err, video) {
    if (err) {
      res.status(400).send("Unable to find video of given id");
    } else {
      res.json(video);
    }
  });
});
VideoRouter.post("/", function (req, res) {
  var url = req.body.url;
  const URL = "http://youtube.com/embed/" + url.split(/=|\//).pop();
  TargetedVideo.findOne({ url: URL }, function (err, video) {
    if (video != null) {
      res.status(200).send("Already Exists");
      return;
    } else {
      axios
        .get(URL)
        .then((response) => {
          if (response.status === 200) {
            let video = new TargetedVideo({url:URL});
            video
              .save()
              .then((video) => {
                res.status(200).send(true);
              })
              .catch((err) => {
                console.log(err);
                res.status(400).send("Error");
              });
          } else {
            res.status(200).send(false);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send(false);
        });
    }
  });
});
VideoRouter.delete("/:id", function (req, res) {
  let id = req.params.id;
  TargetedVideo.findByIdAndDelete(id, function (err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(true);
    }
  });
});
VideoRouter.put("/:id", function (req, res) {
  let id = req.params.id;
  TargetedVideo.findByIdAndUpdate(id, req.body, function (err) {
    if (err) {
      res.status(400).send("Unable to update video");
    } else {
      res.status(200).send(true);
    }
  });
});
module.exports = VideoRouter;
