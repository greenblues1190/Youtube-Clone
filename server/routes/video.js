const express = require("express");
const router = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

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
    console.dir(metadata); // all metadata
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성

  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshot taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
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

router.get("/hello", (req, res) => {
  console.log("received hello!");
  return res.json({
    success: true,
    message: "hello!",
  });
});

module.exports = router;
