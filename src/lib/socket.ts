import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let socketToken: string | null = null;

export function connectSocket(token: string) {
  if (socket && socket.connected && socketToken === token) {
    return socket;
  }

  if (socket && socketToken !== token) {
    socket.disconnect();
    socket = null;
    socketToken = null;
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL as string, {
      transports: ["websocket"],
      auth: {
        token: `Bearer ${token}`,
      },
    });

    socketToken = token;
  }

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (!socket) return;

  socket.disconnect();
  socket = null;
  socketToken = null;
}
