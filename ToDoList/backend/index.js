const express = require("express");
const connection = require("./database");
var cors = require("cors");
const app = express();
const port = 3002;

//Connection to Database
connection();
app.use(cors());
app.use(express.json());
// routes
app.use("/user", require("./routes/user"));
app.use("/Todo", require("./routes/todos"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
