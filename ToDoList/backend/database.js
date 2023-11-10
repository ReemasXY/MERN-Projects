const mongoose = require("mongoose");

const main = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todolist");
    console.log("connection to database successful");
  } catch {
    console.log("connection to database failed");
  }
};

module.exports = main;
