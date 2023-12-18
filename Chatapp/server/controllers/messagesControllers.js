const messageModel = require("../models/messageModel");

const addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "msg added sucessfully" });
    } else {
      return res.json({ errors: "error adding msg to database" });
    }
  } catch (error) {
    res.json({ errors: "Internal Error Occured" });
  }
};
const getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: { $all: [from, to] }, // gives all the data where these two values are present i.e from and to
        // which means even if the to and from are interchange it will still return the data ig.
      })
      .sort({ updateAt: 1 });
    const projectedMsg = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json(projectedMsg);
  } catch (error) {
    res.json({ errors: "Internal Error Occured" });
  }
};
module.exports = { addMsg, getAllMsg };
