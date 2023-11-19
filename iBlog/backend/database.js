const mongoose = require("mongoose");
const MongooseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://sameermhr345:Sameer22@ac-jedyveg-shard-00-00.gga4bol.mongodb.net:27017,ac-jedyveg-shard-00-01.gga4bol.mongodb.net:27017,ac-jedyveg-shard-00-02.gga4bol.mongodb.net:27017/?ssl=true&replicaSet=atlas-1118zi-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    console.log("Connection to database successful");
  } catch (error) {
    console.log("Connection failed", error);
  }
};
module.exports = MongooseConnection;
