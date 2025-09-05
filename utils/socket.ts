import { io } from "socket.io-client";
import { store } from "@/store/store";

const SERVER_URL = process.env.EXPO_PUBLIC_API_URL!;

const state = store.getState();
const userId = state.auth.user?.id;

export const socket = io(SERVER_URL, {
  query: { userId },
});
