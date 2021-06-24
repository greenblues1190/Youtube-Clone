const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pId: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  content: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
