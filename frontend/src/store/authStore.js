import { create } from "zustand";
import { loginUsuario, registerUsuario, logoutUsuario } from "../api/usuarios";

function parseApiError(data) {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  // if it's an object, flatten values (arrays or strings)
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
  isLoading: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginUsuario({ email, password });
      // backend returns { user: {...} }
      const user = data.user || null;
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
      return user;
    } catch (error) {
      const respData = error.response?.data;
      const msg =
        parseApiError(respData) || error.message || "Error en el login";
      set({
        error: msg,
        isLoading: false,
      });
      throw error;
    }
  },

  // Register action
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerUsuario(userData);
      const user = data.user || null;
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
      return user;
    } catch (error) {
      const respData = error.response?.data;
      const msg =
        parseApiError(respData) || error.message || "Error en el registro";
      set({
        error: msg,
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutUsuario();
    } catch (err) {
      // ignore error but clear state
    }
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    return Promise.resolve();
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Load user from previous session (optional placeholder)
  loadUser: () => {
    // Could call an endpoint to fetch current user if needed
  },
}));
