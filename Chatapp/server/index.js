const express = require("express");
const cors = require("cors");
const Connection = require("./database");
const app = express();
const server = require("http").createServer(app);
require("dotenv").config();
const { Server } = require("socket.io");
// const port = process.env.PORT;
// console.log(typeof parseInt(port));

app.use(
  cors({
    origin: "https://chatapp-mu-tawny.vercel.app",
  })
);
app.use(express.json());
Connection(); //connection to database

// available routes

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messagesRoutes"));

server.listen(5000, () => {
  console.log("Running on the port "); //running in different port
});

// const io = socket(server, {
//   //running in different port
//   cors: [],
// });

const io = new Server(server, {
  cors: [],
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id); // socket id keeps on changing as per the reload of the page or say rendering
    // so inorder to identify which socket belongs to which user we store the userId and socketid of the user to the global variable
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-received", data.msg);
    }
  });
});
