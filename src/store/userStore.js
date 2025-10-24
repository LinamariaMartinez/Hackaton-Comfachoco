import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      token: null,
      role: null,
      loading: false,
      isAuthenticated: false,

      // Establecer usuario completo
      setUser: (user, token, role) =>
        set({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || role,
            department: user.department || null,
            balance: user.balance || {
              totalDays: 15,
              usedDays: 0,
              remainingDays: 15,
              pendingRequests: 0,
            },
          },
          token: token,
          role: user.role || role,
          isAuthenticated: true,
          loading: false,
        }),

      // Cerrar sesión
      logout: () =>
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
          loading: false,
        }),

      // Establecer estado de carga
      setLoading: (loading) =>
        set({
          loading,
        }),

      // Actualizar balance del usuario
      updateBalance: (balance) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                balance: {
                  ...state.user.balance,
                  ...balance,
                },
              }
            : null,
        })),

      // Actualizar datos del usuario
      updateUser: (userData) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...userData,
              }
            : null,
        })),
    }),
    {
      name: 'comfachoco-user-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
