const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await mongoose.connect("mongodb://localhost:27017/chatapp");

    console.log("Connection to database successful");
  } catch (error) {
    console.log(error);
  }
};
module.exports = Connection;
