const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Todo = require("../models/List");
const fetchUser = require("../middleware/fetchUser");
// Route 1: Creation of a task
router.post(
  "/createTask",
  [
    body("title", "Title must be at least 5 characters long")
      .notEmpty()
      .isLength({ min: 5 }),
    body("task", "Task should not be empty").notEmpty().isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const { title, task } = req.body;
        const userId = req.user.userId;

        const Db = Todo({
          userId,
          title,
          task,
        });
        const Dbsave = await Db.save();
        res.json(Dbsave);
      } catch (error) {
        console.log(error);
        res.status(401).json({ errors: "Internal Sever Error" });
      }
    } else {
      res.json({ errors: result.array()[0].msg });
    }
  }
);
//Route 2 fetch the task/list of the user
router.get("/fetch", fetchUser, async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const UserId = req.user.userId;
      console.log(UserId);
      const AllTask = await Todo.find({ userId: UserId });
      console.log(AllTask);
      res.json({ AllTask, username: req.user.userName });
    } catch (error) {
      console.log(error);
      res.status(401).json({ errors: "Internal Sever Error" });
    }
  } else {
    res.json({ errors: result.array()[0].msg });
  }
});

// Route3 Delete a note
router.delete("/delete/:id", fetchUser, async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const TobeDeleteTaskId = req.params.id;
      console.log(TobeDeleteTaskId);
      const ToBeDeletedTask = await Todo.findById({ _id: TobeDeleteTaskId });
      console.log(ToBeDeletedTask);
      console.log(req.user.userId, ToBeDeletedTask.userId.toString());

      if (req.user.userId === ToBeDeletedTask.userId.toString()) {
        // to String rakhena bhane tyo new object (..) yesari auxa
        const deleted = await Todo.findOneAndDelete({ _id: TobeDeleteTaskId });
        res.json({ success: "Deleted Successfully", deleted });
      } else {
        res.status(401).json({ error: "Access denied" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ errors: "Internal Sever Error" });
    }
  } else {
    res.json({ errors: result.array()[0].msg });
  }
});
// Route 4 update a task
router.put(
  "/update",
  [
    body("title", "Title must be at least 5 characters long")
      .notEmpty()
      .isLength({ min: 5 }),
    body("task", "Task should not be empty").notEmpty().isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const ToBeUpdatedTaskId = req.header("updateid");

        const ToBeUpdatedTask = await Todo.findById({ _id: ToBeUpdatedTaskId });
        console.log(ToBeUpdatedTask);

        if (req.user.userId === ToBeUpdatedTask.userId.toString()) {
          const UpdatedTask = await Todo.findOneAndUpdate(
            { _id: ToBeUpdatedTaskId },
            req.body,
            { new: true }
          );
          res.json(UpdatedTask);
        } else {
          res.status(401).json({ error: "Access denied" });
        }
      } catch (error) {
        console.log(error);
        res.status(401).json({ errors: "Internal Sever Error" });
      }
    } else {
      res.json({ errors: result.array()[0].msg });
    }
  }
);
module.exports = router;
