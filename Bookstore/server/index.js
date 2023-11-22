const express = require("express");
const connection = require("./database");
const app = express();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const port = 3002;
const userModel = require("./models/loginSignup");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middlewares/Jwttokenverify");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

connection();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // required to parse the json data sent from the client side

// Route:1 Register/SignUp user
app.post(
  "/user/signup",
  [
    body("username", "Username must be 5 characters long").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "Password must be at least 5 charracters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      try {
        console.log(jwtSecret);
        const { username, email, password } = req.body;
        const existingEmail = await userModel.find({ email });

        if (existingEmail.length !== 0) {
          return res.json({
            errors: "Email address already exists! please use another one",
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await userModel.create({
          username,
          email,
          password: hash,
        });
        res.json({ user, success: "user created successfully" });
      } catch (error) {
        return res.json({ errors: "Internal Server Error" });
      }
    } else {
      res.send({ errors: result.array()[0].msg });
    }
  }
);

//Route 2: Login a user and send an jwttoken to the user
app.post(
  "/user/login",
  [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("password", "Password must be at least 5 charracters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      try {
        const { email, password } = req.body;
        const validUser = await userModel.findOne({ email });
        if (!validUser) {
          return res
            .status(400)
            .json({ errors: "Please login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(
          password,
          validUser.password
        );
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ errors: "Please login with correct credentials" });
        }
        console.log(validUser.id, jwtSecret);
        const token = jwt.sign(
          { userId: validUser.id, username: validUser.username },
          jwtSecret
        );
        console.log(token);
        res
          .cookie("authToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .json({ success: "Logged in Successfully", token: token });
      } catch (error) {
        return res.json({ errors: "Internal Server Error" + error });
      }
    } else {
      return res.send({ errors: result.array()[0].msg });
    }
  }
);
// Route 3: get the user info for the navigation bar
app.get("/user/info", verifyToken, async (req, res) => {
  try {
    console.log(req.cookies);
    res.json(req.user);
  } catch (error) {
    return res.json({ errors: "Internal Server Error" + error });
  }
});

//Route 4: logout the user

app.get("/user/logout", async (req, res) => {
  try {
    res
      .clearCookie("authToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json("sent");
  } catch (error) {
    return res.json({ errors: "Internal Server Error" + error });
  }
});
app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
