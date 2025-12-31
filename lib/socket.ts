import { io } from "socket.io-client";

export const socket = io("http://ec2-44-210-134-149.compute-1.amazonaws.com", {
  autoConnect: false,
});
