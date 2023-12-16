const express = require("express");
const { addMsg } = require("../controllers/messagesControllers");
const router = express.Router();

router.post("/addmsg", addMsg);


module.exports = router;
