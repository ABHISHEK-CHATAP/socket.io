import express from "express";
const PORT = 3300;
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("hello world!!!");
});

io.on("connection", (socket) => {
  console.log("user connected",socket.id);

  // socket.emit("welcome",`welcome to the server.. ${socket.id}`);

  // socket.broadcast.emit("welcome",`${socket.id} joined the server...`);
  // brodcast se user ko chodke sabko pata chalega ke user join hua hai

  socket.on("message",(data)=>{
    console.log(data);
    // io.emit("received-message",data);   // ye msg sabko milega
    socket.broadcast.emit("received-message",data); //
  })

  socket.on("disconnect", ()=>{
    console.log("user disconnected...",socket.id);
  })

});

app.use(cors()); // for API cors middleware , only use when API need to create


server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

// yaha app.listen krne se server ka instance create hoga
//jo humne [io circuit] createServer kia hai toh wo [server] variable me kia hai
// toh listen bhi [server] se hoga NOT [app] se