import {app} from "./app.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import socketHandler from "./src/sockets/meetingSocket.js";

const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

socketHandler(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
