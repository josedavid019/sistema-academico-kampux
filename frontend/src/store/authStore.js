import { create } from "zustand";
import { loginUsuario, logoutUsuario } from "../api/usuarios.api";

function parseApiError(data) {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (typeof data === "object") {
    const parts = [];
    for (const val of Object.values(data)) {
      if (Array.isArray(val)) parts.push(val.join(" "));
      else if (typeof val === "object") parts.push(JSON.stringify(val));
      else parts.push(String(val));
    }
    return parts.join(" | ");
  }
  return String(data);
}

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  // start as loading until we read localStorage to avoid
  // redirecting protected routes before state is restored
  isLoading: true,
  error: null,

  // Load user from localStorage (or later from /auth/me)
  loadUser: () => {
    set({ isLoading: true, error: null });
    const raw = localStorage.getItem("kampux_user");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        set({ user, isAuthenticated: true, isLoading: false });
      } catch (e) {
        localStorage.removeItem("kampux_user");
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // loginUsuario ahora retorna response.data (el usuario)
      const user = await loginUsuario({ email, password });
      // guardar en estado y localStorage
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      });
      try {
        localStorage.setItem("kampux_user", JSON.stringify(user));
      } catch (e) {
        console.warn("No se pudo guardar usuario en localStorage", e);
      }
      return user;
    } catch (error) {
      const respData = error.response?.data;
      const msg =
        parseApiError(respData) || error.message || "Error en el login";
      set({
        error: msg,
        isLoading: false,
        user: null,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  // Registration is disabled on the frontend. Use backend/admin tools to create users.

  // Logout action
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutUsuario();
    } catch (err) {
      // ignore error (server may clear session), but clear client state
    }
    localStorage.removeItem("kampux_user");
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    return Promise.resolve();
  },

  clearError: () => set({ error: null }),
}));
