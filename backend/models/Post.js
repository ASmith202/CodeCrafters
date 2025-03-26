const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      { type: mongoose.Types.ObjectId, required: true, ref: "Comment" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
