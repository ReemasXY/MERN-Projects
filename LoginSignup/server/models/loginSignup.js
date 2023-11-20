const mongoose = require("mongoose");
const { Schema } = mongoose;

const signupSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", signupSchema);
