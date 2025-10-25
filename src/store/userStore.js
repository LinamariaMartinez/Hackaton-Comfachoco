import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getCurrentUser, onAuthStateChange } from '../services/auth'

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => {
        console.log('📝 setUser llamado con:', user)
        
        // Guardar en localStorage para modo temporal
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', user.token || 'temp-token-123')
        }
        
        set({ 
          user, 
          isAuthenticated: !!user 
        })
        
        console.log('✅ Estado actualizado - isAuthenticated:', !!user)
      },

      clearUser: () => {
        console.log('🧹 clearUser llamado')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        set({
          user: null,
          isAuthenticated: false
        })
      },

      logout: () => {
        console.log('👋 Logout llamado')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        set({
          user: null,
          isAuthenticated: false
        })
      },

      // 🔥 CORREGIDO: Inicializar auth mejorado
      initializeAuth: async () => {
        console.log('🚀 Inicializando auth...')
        set({ isLoading: true })
        
        try {
          const user = await getCurrentUser()
          console.log('👤 Usuario obtenido en init:', user)
          
          set({ 
            user, 
            isAuthenticated: !!user,
            isLoading: false 
          })

          // Configurar listener de cambios de auth
          const cleanup = onAuthStateChange((authUser) => {
            console.log('🔄 Auth state cambió:', authUser)
            set({ 
              user: authUser, 
              isAuthenticated: !!authUser 
            })
          })

          console.log('✅ Auth inicializado - isAuthenticated:', !!user)
          return cleanup

        } catch (error) {
          console.error('❌ Error al inicializar auth:', error)
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          })
        }
      },

      // Getters
      get role() {
        return get().user?.role
      },

      get isEmployee() {
        return get().user?.role === 'employee'
      },

      get isSupervisor() {
        return get().user?.role === 'supervisor'
      },

      get isHR() {
        return get().user?.role === 'hr'
      }
    }),
    {
      name: 'user-store',
      // 🔥 IMPORTANTE: Sincronizar con localStorage
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)

export { useUserStore }
export default useUserStore
