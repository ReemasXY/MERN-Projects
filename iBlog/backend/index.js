const express = require("express");
const cors = require("cors");
const app = express();
const Connection = require("./database");
var cookieParser = require("cookie-parser");
app.use("/uploads", express.static("uploads"));
Connection();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json()); // this is here so that incoming request can be converted in to json form
app.use("/", require("./routes/all"));
app.listen(5000);
