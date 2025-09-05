import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { store } from "@/store/store";
import { addNotification } from "@/store/notificationsSlice";

type RootState = ReturnType<typeof store.getState>;

let socketRef: Socket | null = null;
let dummyIntervalRef: number | null = null;

export function useSocket() {
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const dispatch = store.dispatch;

    // Jika user belum login, jangan buat socket
    if (!user?.id) return;

    const SERVER_URL = process.env.EXPO_PUBLIC_API_URL;

    // SOCKET REAL
    if (SERVER_URL) {
      if (!socketRef) {
        socketRef = io(SERVER_URL, { query: { userId: user.id } });

        socketRef.on("connect", () => {
          console.log("Connected to Socket.IO server");
        });

        socketRef.on("newNotification", (data: any) => {
          const exists = store
            .getState()
            .notifications.list.some((n) => n.id === data.id);
          if (!exists) {
            console.log("Received new notification:", data);
            dispatch(addNotification(data));
          }
        });
      }
    }
    // DUMMY NOTIF
    else {
      if (!dummyIntervalRef) {
        dummyIntervalRef = setInterval(() => {
          const currentNotifications = store.getState().notifications.list;
          if (currentNotifications.length >= 5) return;

          const dummy = {
            id: Date.now(),
            title: "Dummy Notification",
            message: "This is a dummy notification.",
            createdAt: new Date().toISOString(),
            read: false,
            type: "global",
          };

          // Cek duplikat terakhir
          const lastNotif = currentNotifications[currentNotifications.length - 1];
          if (!lastNotif || lastNotif.id !== dummy.id) {
            dispatch(addNotification(dummy));
          }
        }, 3000);
      }
    }

    return () => {
      // Cleanup socket
      if (socketRef) {
        socketRef.disconnect();
        socketRef = null;
      }
      // Cleanup dummy interval
      if (dummyIntervalRef) {
        clearInterval(dummyIntervalRef);
        dummyIntervalRef = null;
      }
    };
  }, [user?.id]);

  return socketRef;
}
