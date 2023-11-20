const mongoose = require("mongoose");
const MongooseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://sameermhr345:Sameer22@ac-j04jras-shard-00-00.xsti5us.mongodb.net:27017,ac-j04jras-shard-00-01.xsti5us.mongodb.net:27017,ac-j04jras-shard-00-02.xsti5us.mongodb.net:27017/loginsignup?ssl=true&replicaSet=atlas-zgkmn0-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    console.log("Connection to database successful");
  } catch (error) {
    console.log("Connection failed", error);
  }
};
module.exports = MongooseConnection;
