const express = require("express");
const {
  register,
  login,
  setAvatar,
  allUsers,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.get("/allUsers/:id", allUsers);

module.exports = router;
