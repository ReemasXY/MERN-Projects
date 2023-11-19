const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Users", User);
