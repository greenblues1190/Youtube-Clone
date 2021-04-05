const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

//=================================
//             Video
//=================================

const allowedFileNameExtensions = [
    ".mp4",
    ".MP4"
    // ".jpeg",
    // ".jpg",
    // ".JPEG",
    // ".JPG",
    // ".png",
    // ".PNG",
]

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(allowedFileNameExtensions.includes(!ext)) {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

router.post('/uploadfiles', (req, res) => {
    // upload video to server
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        return res.status(200).json({
            url: res.req.file.path,
            fileName: res.req.file.filename
        })
    })
})

router.get('/hello', (req, res) => {
    console.log("received hello!");
    return res.json({
        success: true,
        message: "hello!"
    });
})

module.exports = router;
