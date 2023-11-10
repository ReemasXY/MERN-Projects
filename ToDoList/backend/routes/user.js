const express = require("express");
const user = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const router = express.Router();

// Route 1: Creation of the user
router.post(
  "/createUser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
    body("username", "Please enter a username that is atleast 5 char long")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        let check = await user.findOne({ email: req.body.email });
        if (check) {
          return res
            .status(400)
            .json({ errors: "Sorry a user with the email already exists" });
        }
        const { email, password, username } = req.body;
        console.log(username);
        const salt = await bcrypt.genSalt(10); // don't use sync gensalt// 20 is length of the salt that is generated randomly
        const hash = await bcrypt.hash(password, salt);
        const Db = user({
          user: username,
          email,
          password: hash,
        }); //whatever comes in the body goes to the database to be saved
        Db.save();
        res.json({ success: "true", Db });
      } catch (error) {
        console.log(error);
        res.status(401).json({ errors: "Internal Sever Error" });
      }
    } else {
      res.json({ errors: result.array()[0].msg });
    }
  }
);

//Route to login the user and providing the jwt token to identify the user uniquely
router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail().notEmpty(),
    body("password", "Password must be at least 5 charcters long"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User) {
          return res
            .status(400)
            .send({ errors: "Please Login with the correct credentials" });
        }
        console.log(User);
        const checkuser = await bcrypt.compare(password, User.password);
        if (!checkuser) {
          return res
            .status(400)
            .send({ errors: "Please Login with the correct credentials" });
        }
        // console.log(User.id, User.user); // There is the difference in _id and id id le only id dinxa but _id le ObjectId("id") yesari dinxa
        const token = jwt.sign({ id: User.id, userName: User.user }, "Samdiw");
        res.json({ authToken: token, userName: User.user });
      } catch (error) {
        res.status(400).json({ errors: "Internal server Error:" + error });
      }
    } else {
      res.json({ errors: result.array()[0].msg });
    }
  }
);
module.exports = router;
