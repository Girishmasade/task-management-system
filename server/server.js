import {app} from "./app.js";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./src/sockets/meetingSocket.js";

const server = http.createServer(app);

const io = new Server(server);

socketHandler(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
