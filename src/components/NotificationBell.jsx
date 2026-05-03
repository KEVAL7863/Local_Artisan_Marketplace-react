import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

const colorMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
  green: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", dot: "bg-green-500" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  red: { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", dot: "bg-red-500" },
};

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 rounded-xl bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-400 hover:text-primary transition-all relative"
      >
        <span className="material-symbols-outlined">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-black rounded-full px-1 border-2 border-white dark:border-background-dark animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-primary/10 flex items-center justify-between bg-primary/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">notifications</span>
              <h3 className="font-bold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount} new</span>
              )}
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-primary/5">
            {notifications.length > 0 ? notifications.slice(0, 15).map((n) => {
              const colors = colorMap[n.color] || colorMap.blue;
              return (
                <Link
                  key={n.id}
                  to={n.link || "/admin"}
                  onClick={() => { markAsRead(n.id); setOpen(false); }}
                  className={`flex items-start gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all ${!n.is_read ? "bg-primary/5" : ""}`}
                >
                  <div className={`h-10 w-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <span className={`material-symbols-outlined ${colors.text} text-xl`}>{n.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-bold truncate ${!n.is_read ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                        {n.title}
                      </p>
                      {!n.is_read && <span className={`w-2 h-2 rounded-full ${colors.dot} shrink-0`}></span>}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{n.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{timeAgo(new Date(n.created_at).getTime())}</p>
                  </div>
                </Link>
              );
            }) : (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 mb-2 block">notifications_off</span>
                <p className="text-sm text-slate-500 font-medium">No notifications yet</p>
                <p className="text-xs text-slate-400 mt-1">New orders, registrations, and approvals will appear here.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 5 && (
            <div className="p-3 border-t border-primary/10 bg-primary/5 text-center">
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="text-xs font-bold text-primary hover:underline"
              >
                View all activity on Dashboard
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
