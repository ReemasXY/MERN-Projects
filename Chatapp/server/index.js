const express = require("express");
const cors = require("cors");
const Connection = require("./database");
const app = express();
require("dotenv").config();
// const port = process.env.PORT;
// console.log(typeof parseInt(port));

app.use(cors());
app.use(express.json());
Connection(); //connection to database

// available routes

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messagesRoutes"));

app.listen(5000, () => {
  console.log("Running on the port ");
});
