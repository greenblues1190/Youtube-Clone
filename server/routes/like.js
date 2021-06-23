const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//           Like Dislike
//=================================

const target = (req) => {
  switch (req.body.type) {
    case "video":
      return { videoId: req.body.objectId };
    case "comment":
      return { commentId: req.body.objectId };
    default:
      return null;
  }
}

router.post('/getLikes', (req, res) => {
  // get like data
  const query = target(req)
  Like.find(query)
    .exec((err, likes) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        likes
      })
    })
})

router.post('/getDislikes', (req, res) => {
  // get dislike data
  const query = target(req)
  Dislike.find(query)
    .exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        dislikes
      })
    })
})

router.post('/like', (req, res) => {
  // add like
  const newLike = { userId: req.body.userId, ...target(req) }
  const like = new Like(newLike)
  like.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      doc
    });
  })
})

router.post('/unlike', (req, res) => {
  const query = { userId: req.body.userId, ...target(req) }

  Like.findOneAndDelete(query)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        doc
      })
    })
})

router.post('/dislike', (req, res) => {
  // add dislike
  const newDislike = { userId: req.body.userId, ...target(req) }
  const dislike = new Dislike(newDislike)
  dislike.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      doc
    });
  })
})

router.post('/unDislike', (req, res) => {
  const query = { userId: req.body.userId, ...target(req) }

  Dislike.findOneAndDelete(query)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        doc
      })
    })
})

router

module.exports = router;