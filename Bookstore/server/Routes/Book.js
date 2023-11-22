const express = require("express");
const bookmodel = require("../models/bookmodel");
const verifyToken = require("../middlewares/Jwttokenverify");
const router = express.Router();

router.post("/createbook", verifyToken, async (req, res) => {
  try {
    const { title, publishedYear } = req.body;
    const user = req.user;
    console.log(user);
    const bookInfo = await bookmodel.create({
      title,
      publishedYear,
      author: user.userId,
    });
    res.json(bookInfo);
  } catch (error) {
    res.status(400).json({ errors: "There is an error" + error });
  }
});
module.exports = router;
