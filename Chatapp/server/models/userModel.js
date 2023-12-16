const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 20,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  AvatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);
