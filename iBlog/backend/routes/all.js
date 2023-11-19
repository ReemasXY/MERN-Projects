const express = require("express");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const post = require("../models/Blog");
const secret = "sameerreemas";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const CheckUser = await UserModel.find({ username });

    if (CheckUser.length !== 0) {
      return res
        .status(400)
        .json({ error: "Username already exists. Please enter a unquie user" });
    }
    const salt = await bcrypt.genSalt(10);

    const newUser = await UserModel.create({
      username,
      password: await bcrypt.hash(password, salt),
    });
    res.json({ serverData: newUser });
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
});

// Route to login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await UserModel.findOne({ username });
    if (!findUser) {
      return res.status(400).json({ error: "User not found" });
    }
    const validateUser = await bcrypt.compare(password, findUser.password);

    if (validateUser) {
      const authToken = jwt.sign({ username, id: findUser.id }, secret);
      // res.json({ authToken });
      res.cookie("authToken", authToken).json({ username });
    } else {
      res.json({ error: "Please login with correct credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", (req, res) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.json("Please log in first");
  }
  jwt.verify(authToken, secret, {}, (err, info) => {
    if (err) {
      res.json(err);
    } else {
      res.json(info);
    }
  });
});

router.get("/logout", (req, res) => {
  res.cookie("authToken", "").json("ok");
});

router.post("/create", uploadMiddleware.single("file"), async (req, res) => {
  try {
    //Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

    // multer is required to handle formdata ( tyo hamile pathako wala client side ma )
    // tyo hamro files haru server ma pathauna parda in multer use hunxa
    // hamro tyo input value (expect type file of input) will be stored in req.body
    // input of type file/files will be stored in req.file/files

    const { authToken } = req.cookies;
    const jwtverify = jwt.verify(authToken, secret);
    // const { username } = jwtverify;

    const userId = jwtverify.id;

    //files from the client side will be stored in uploads automatically through multer(just for files not for others)
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath); // doesnt return anything

    const { title, content, summary } = req.body;

    const db = await post.create({
      title,
      summary,
      content,
      image: newPath,
      author: userId,
    });
    res.json(db);
  } catch (error) {
    res.json({ error: "Creation of Post failed" });
  }
});

router.get("/post", async (req, res) => {
  const allPost = await post
    .find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  // find alone gets all the document of the databse
  // populate le chai aba tyo arko model ko id ko sab info display garxa
  // specific data matra arko model ko id ko chaiyo bhane hamile username gare jasto garne
  // limit le chai aba kati ota data client lai pathaune maximum bhanne kam garxa

  res.json(allPost);
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const data = await post.findById(id).populate("author", "username");
  console.log(data);
  res.json(data);
});
// router.get("/del", async () => {
//   await post.deleteMany();
//   console.log("deleted");
//   res.json("deleted");
// });

router.put("/edit/:id", uploadMiddleware.single("file"), async (req, res) => {
  try {
    // res.json({ body: req.body, file: req.file });
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { title, content, summary } = req.body;
    const { authToken } = req.cookies;

    const jwtverify = jwt.verify(authToken, secret);
    const userId = jwtverify.id;
    const TobeUpdatedPost = await post.findById(req.params.id);

    if (userId !== TobeUpdatedPost.author.toString()) {
      console.log("no access");
      return res.status(401).json("your are not the valid author");
    }
    const Updated = await post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        summary,
        image: !newPath ? TobeUpdatedPost.image : newPath,
      },
      { new: true }
    ); //only the fields provided will be updated
    //if the field not provided it wont be updated nor overwritten
    console.log(Updated);
    res.json(Updated);
  } catch (error) {
    res.json({ error: "Creation of Post failed" + error });
  }
});

module.exports = router;
