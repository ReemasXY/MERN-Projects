import express from "express";
import { config } from "dotenv";
import connection from "./db/db.js";
config();
connection();
// const express = require('express');
const app = express();
app.use(express.json()); // to parse the incoming json string into js object/string etc
app.get("/", () => {
});
const server = app.listen(3000, () => {
    console.log("App running on the port 3000");
});
//# sourceMappingURL=index.js.map