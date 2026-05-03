import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from JWT on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then((u) => setUser(u))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (payload) => {
    const data = await api.post("/auth/register", {
      name: (payload.name || "").trim(),
      email: (payload.email || "").trim().toLowerCase(),
      password: (payload.password || "").trim(),
      role: payload.role || "user",
      studio: payload.studio || null,
      craft: payload.craft || null,
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const data = await api.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    const updated = await api.put(`/users/${user.id}/profile`, updates);
    setUser(updated);
    return updated;
  };

  const value = useMemo(
    () => ({ user, loading, register, login, logout, updateProfile }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
