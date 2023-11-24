const express = require("express");
const connection = require("./database");
const app = express();
const port = 3002;
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

connection();
app.use(cookieParser());
app.use(
  cors({
    origin: "https://bookstore-three-beige.vercel.app",
    credentials: true,
  })
);
app.use(express.json()); // required to parse the json data sent from the client side

app.use("/", require("./Routes/LoginSignup"));
app.use("/", require("./Routes/Book"));
app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
