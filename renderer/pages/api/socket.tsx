import message from "utils/handleMessage";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/chat";
import { Server } from "socket.io";
import { Server as NetServer } from "http";

export default function handleSocket(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = socket => {
    message(io, socket);
  };

  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();

  // if (!res.socket.server.io) {
  //   console.log("New Socket.io server...");
  //   // adapt Next's net Server to http Server
  //   const httpServer: NetServer = res.socket.server as any;
  //   const io = new ServerIO(httpServer, {
  //     path: "/api/socketio",
  //   });
  //   // append SocketIO server to Next.js socket server response
  //   res.socket.server.io = io;
  // }
  // res.end();
}
