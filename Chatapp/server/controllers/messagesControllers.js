const messageModel = require("../models/messageModel");

const addMsg = async (req, res, next) => {
  try {
  } catch (error) {
    res.json({ errors: "Internal Error Occured" });
  }
};
module.exports = { addMsg };
