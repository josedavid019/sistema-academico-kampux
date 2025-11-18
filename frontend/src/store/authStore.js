import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await authAPI.login(email, password);
      // localStorage.setItem('token', response.token);
      set({
        user: { email },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Error en el login',
        isLoading: false,
      });
    }
  },

  // Register action
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await authAPI.register(userData);
      // localStorage.setItem('token', response.token);
      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Error en el registro',
        isLoading: false,
      });
    }
  },

  // Logout action
  logout: async () => {
    // allow callers to await the logout operation
    localStorage.removeItem('token');
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
    return Promise.resolve();
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Load user from localStorage (para persistencia)
  loadUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validar token con el backend
      set({ isAuthenticated: true });
    }
  },
}));
