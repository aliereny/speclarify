"use client";
import { useAppSelector } from "@/redux/appStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function useNotification() {
  const { accessToken } = useAppSelector((state) => state.user);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    if (accessToken && apiUrl) {
      const socket = io(apiUrl, {
        auth: {
          token: accessToken,
        },
      });

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("notification", (data) => {
        console.log("notification", data);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [accessToken]);
}
