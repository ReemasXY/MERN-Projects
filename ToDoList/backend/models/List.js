const mongoose = require("mongoose");

const { Schema } = mongoose;

const ToDo = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", ToDo);
