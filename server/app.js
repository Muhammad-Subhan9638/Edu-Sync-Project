const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");
const CookiesParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/userRoutes");
const socket = require("socket.io");

// Connect ENV File
dotenv.config({ path: "./config.env" });

// Database connection with MongoDB Atlas
require("./db/conn");

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PROD,
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(CookiesParser());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Start Server
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// Socket.IO Setup
const io = socket(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

const onlineUsers = new Map();
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User added:", userId, "Socket ID:", socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    } else {
      console.log("User not online:", data.to);
    }
  });

  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    emailToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });

  socket.on("call-user", (data) => {
    const { emailId, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id);
    const socketId = emailToSocketMapping.get(emailId);
    if (socketId) {
      socket.to(socketId).emit("incomming-call", { from: fromEmail, offer });
    } else {
      console.log("User not available for call:", emailId);
    }
  });

  socket.on("call-accepted", (data) => {
    const { emailId, ans } = data;
    const socketId = emailToSocketMapping.get(emailId);
    if (socketId) {
      socket.to(socketId).emit("call-accepted", { ans });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    const emailId = socketToEmailMapping.get(socket.id);
    if (emailId) {
      emailToSocketMapping.delete(emailId);
      socketToEmailMapping.delete(socket.id);
    }

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});
