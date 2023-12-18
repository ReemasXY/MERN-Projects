const express = require("express");
const cors = require("cors");
const Connection = require("./database");
const app = express();
require("dotenv").config();
const socket = require("socket.io");
// const port = process.env.PORT;
// console.log(typeof parseInt(port));

app.use(cors());
app.use(express.json());
Connection(); //connection to database

// available routes

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messagesRoutes"));

const server = app.listen(5000, () => {
  console.log("Running on the port "); //running in different port
});

const io = socket(5001, {
  //running in different port
  cors: [],
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id); // socket id keeps on changing as per the reload of the page or say rendering
    // so inorder to identify which socket belongs to which user we store the userId and socketid of the user to the global variable
    console.log(onlineUsers);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-received", data.msg);
    }
  });
});
