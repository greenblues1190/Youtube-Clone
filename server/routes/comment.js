const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {
  // save the comment
  console.log(req.body)
  const comment = new Comment(req.body)
  comment.save((err, doc) => {
    if (err) return res.status(400).send(err);
    Comment.find({ '_id': comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
          success: true,
          result
        })
      })
  })
});

router.post("/deleteComment", (req, res) => {
  // delete the comment
  Comment.findOneAndDelete({ _id: commentId })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        doc
      })
    })
})

router.post("/getVideoComments", (req, res) => [
  // get all comments of the video
  Comment.find({ 'videoId': req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        comments
      })
    })
])

module.exports = router;