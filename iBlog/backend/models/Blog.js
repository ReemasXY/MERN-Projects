const mongoose = require("mongoose");
const { Schema } = mongoose;

const Blog = new Schema(
  {
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String, //why string? because we are storing the path of the image not the image itself
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", Blog);
