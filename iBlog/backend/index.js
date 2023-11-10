const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json()); // this is here so that incoming request can be converted in to json form
app.post("/register", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username, password);
  res.json({ serverData: { username, password } });
});
app.listen(5000);
