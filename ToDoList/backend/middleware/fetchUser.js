const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const authtoken = req.header("authToken");
  if (!authtoken) {
    return res
      .status(400)
      .json({ errors: "Please authenticate with correct credentials" });
  }
  try {
    const verified = jwt.verify(authtoken, "Samdiw");

    const userId = verified.id;
    const userName = verified.userName;
    req.user = {
      userId,
      userName,
    };
    next();
  } catch (error) {
    return res.send({ errors: " Please authenticate with valid token" });
  }
};

module.exports = fetchUser;
