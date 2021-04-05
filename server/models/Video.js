const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    title: {
        type:String,
        maxlength:50
    },
    description: {
        type:String,
        maxlength:1000
    },
    privacy : {
        type:Number,
        default: 0,
    },
    category: {
        type:String,
        maxlength: 50,
    },
    view: {
        type: Number,
    },
})

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }