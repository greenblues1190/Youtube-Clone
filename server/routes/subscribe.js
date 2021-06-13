const express = require("express");
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//           Subscribe
//=================================

router.post("/getSubscriberNumber", (req, res) => {
  // get subscribers number with userId
  Subscriber.find({ userTo: req.body.userTo })
    .exec((err, subscribers) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        subscriberNumber: subscribers.length
      })
    })
})

router.post("/isSubscribed", (req, res) => {
  // get subscribers number with userId
  Subscriber.find({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, subscriber) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        isSubscribed: (subscriber.length !== 0 ? true : false)
      })
    })
})

router.post("/unSubscribe", (req, res) => {
  // unsubscribe the channel
  Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({
        success: true,
        doc
      })
    })
})

router.post('/subscribe', (req, res) => {
  // subscribe the channel
  const subscriber = new Subscriber(req.body)
  subscriber.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      doc
    })
  })
});

module.exports = router;
