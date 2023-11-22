const mongoose = require("mongoose");
const MongooseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://sameermhr345:Sameer22@ac-hzt8uat-shard-00-00.cl6po1q.mongodb.net:27017,ac-hzt8uat-shard-00-01.cl6po1q.mongodb.net:27017,ac-hzt8uat-shard-00-02.cl6po1q.mongodb.net:27017/bookCollection?ssl=true&replicaSet=atlas-62ihoo-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    console.log("Connection to database successful");
  } catch (error) {
    console.log("Connection failed", error);
  }
};
module.exports = MongooseConnection;
