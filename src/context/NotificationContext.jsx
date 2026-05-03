import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../utils/api";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!user || user.role !== "admin") return;
    try {
      const data = await api.get("/notifications");
      setNotifications(data);
    } catch {
      // ignore fetch errors
    }
  }, [user]);

  // Poll every 5 seconds for admin
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // ignore
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch {
      // ignore
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await api.delete("/notifications");
      setNotifications([]);
    } catch {
      // ignore
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const value = { notifications, unreadCount, markAsRead, markAllAsRead, clearAll };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  return useContext(NotificationContext);
}
