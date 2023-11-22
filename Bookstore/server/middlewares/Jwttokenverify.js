const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    console.log(req.cookies, process.env.JWT_SECRET);
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.json({ errors: "No Token", cookies: req.cookies });
    }

    const jwtVerification = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = jwtVerification;
    next();
  } catch (error) {
    return res.status(400).json({ errors: "some error occured" + error });
  }
};
module.exports = verifyToken;
