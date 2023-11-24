const express = require("express");
const bookmodel = require("../models/bookmodel");
const verifyToken = require("../middlewares/Jwttokenverify");
const router = express.Router();

router.post("/createbook", verifyToken, async (req, res) => {
  try {
    const { title, publishedYear, description } = req.body;
    const user = req.user;
    console.log(user);
    const bookInfo = await bookmodel.create({
      title,
      publishedYear,
      author: user.userId,
      description,
    });
    res.json(bookInfo);
  } catch (error) {
    res.status(400).json({ errors: "There is an error" + error });
  }
});

router.get("/getbooks", async (req, res) => {
  try {
    const allbooks = await bookmodel.find().populate("author", "username");
    res.json({ bookslength: allbooks.length, data: allbooks });
  } catch (error) {
    res.status(400).json({ errors: "There is an error" + error });
  }
});
// router.delete("/del", async (req, res) => {
//   try {
//     const allbooksdelete = await bookmodel.deleteMany();
//     res.json("deleted successfully");
//   } catch (error) {
//     res.status(400).json({ errors: "There is an error" + error });
//   }
// });

router.get("/book/:id", async (req, res) => {
  try {
    const abook = await bookmodel
      .findById(req.params.id)
      .populate("author", "username");
    if (!abook) {
      return res.status(400).json({ errors: "No book found" });
    }
    res.json(abook);
  } catch (error) {
    res.status(400).json({ errors: "There is an error" + error });
  }
});

router.put("/book/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.userId;
    const bookUserId = await bookmodel.findById(id);
    console.log(bookUserId.author.toString(), currentUserId);
    if (!(currentUserId === bookUserId.author.toString())) {
      return res
        .status(401)
        .json("Access denied! You are not  the author of this book");
    }
    const { title, publishedYear, description } = req.body;
    const Tobeupdatedbook = await bookmodel.findByIdAndUpdate(
      id,
      {
        title,
        publishedYear,
        description,
      },
      {
        new: true,
      }
    );
    if (!Tobeupdatedbook) {
      res.status(400).json({ errors: " NO book found" }); //no particular use of it
    } else {
      res.json({ Tobeupdatedbook, success: "book updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ errors: "There is an error" + error });
  }
});

router.delete("/book/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.userId;
    const bookUserId = await bookmodel.findById(id);
    console.log(bookUserId.author.toString(), currentUserId);
    if (!(currentUserId === bookUserId.author.toString())) {
      return res
        .status(401)
        .json({
          errors: "Access denied! You are not  the author of this book",
        });
    }
    const deleted = await bookmodel.findByIdAndDelete(id);
    res.json({ success: "Deleted Successfully", deleted });
  } catch (error) {
    res.status(400).json({ errors: "There is an error" + error });
  }
});
module.exports = router;
