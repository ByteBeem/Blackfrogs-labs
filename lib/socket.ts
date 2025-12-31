import { io } from "socket.io-client";

export const socket = io("https://api.blackfroglabs.co.za", {
  autoConnect: false,
});
