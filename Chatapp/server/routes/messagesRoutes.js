const express = require("express");
const { addMsg, getAllMsg } = require("../controllers/messagesControllers");
const router = express.Router();

router.post("/addmsg", addMsg);
router.post("/getallmsg", getAllMsg);

module.exports = router;
