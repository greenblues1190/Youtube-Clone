const express = require("express");
const router = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Video
//=================================

const allowedFileNameExtensions = [
  ".mp4",
  ".MP4",
  // ".jpeg",
  // ".jpg",
  // ".JPEG",
  // ".JPG",
  // ".png",
  // ".PNG",
];

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (allowedFileNameExtensions.includes(!ext)) {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

const { json } = require("express");

router.post("/uploadfiles", (req, res) => {
  // upload video to server
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    return res.status(200).json({
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  // 썸네일 생성하고 비디오 러닝타임도 가져오기

  let filePath = "";
  let fileDuration = "";

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    // console.dir(metadata); // all metadata
    // console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성

  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      // console.log("Will generate " + filenames.join(", "));
      // console.log(filenames);
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      // console.log("Screenshot taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screenshots at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b: input basename (filname w/o extention)
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadVideo", (req, res) => {
  // upload video metadata
  const newVideo = new Video(req.body);

  newVideo.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
});

router.post("/updateVideo", (req, res) => {
  // update video metadata
  query = { _id: req.body.videoId };
  updatedField = req.body.updatedMetadata;
  Video.findOneAndUpdate(query, { $set: updatedField })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        doc
      })
    })
});

router.post("/deleteVideo", (req, res) => {
  // delete video
  query = { _id: req.body.videoId };
  updatedField = { isDeleted: true }

  Video.findOneAndUpdate(query, { $set: updatedField })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        doc
      })
    })

  // Video.findOneAndDelete(query)
  //   .exec((err, doc) => {
  //     if (err) return res.status(400).send(err);
  //     res.status(200).json({
  //       success: true,
  //       doc
  //     })
  //   })
})

router.get("/getVideos", (req, res) => {
  // get videos from DB and send it to the client
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        videos
      })
    })
});

router.post("/getSubscribedVideos", (req, res) => {
  // get subscribed users with userFrom
  Subscriber.find({ userFrom: req.body.userFrom })
    .exec((err, subscriptions) => {
      if (err) return res.send(err);
      const subscribedUsers = subscriptions.map(subscription => subscription.userTo);
      Video.find({ writer: { $in: subscribedUsers } })
        .populate('writer')
        .exec((err, videos) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({
            success: true,
            videos
          })
        })
    })
});

router.post("/getUserVideos", (req, res) => {
  // get subscribed users with userFrom
  Video.find({ writer: { _id: req.body.userId } })
    .populate('writer')
    .exec((err, userVideos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        userVideos
      })
    })
});

router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate('writer')
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        videoDetail
      })
    })
})

router.post("/addView", (req, res) => {
  Video.findOneAndUpdate({ _id: req.body.videoId }, { $inc: { views: 1 } }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      doc
    })
  })
})

router.get('/search', (req, res) => {
  Video.find(
    {
      $text: {
        $search: req.query.query,
        $caseSensitive: false,
      }
    },
    { score: { $meta: "textScore" } }
  ).sort(
    { score: { $meta: "textScore" } }
  ).populate('writer')
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      const filteredDoc = doc.filter(doc => !doc.isDeleted && !doc.isPrivate);
      res.status(200).json({
        success: true,
        filteredDoc
      })
    })
})

module.exports = router;
