import { supabase } from '../lib/supabaseClient'

// 🚧 MODO DEVELOPMENT: Usuario temporal para testing
const TEMP_USER = {
  id: 'temp-user-123',
  email: 'empleado@comfachoco.com',
  name: 'Usuario Temporal',
  role: 'employee',
  department: 'Desarrollo',
  documento: '1234567890'  // 🔥 Importante para N8N
}

// Variable para activar/desactivar modo temporal
const USE_TEMP_LOGIN = true // ⚠️ Cambiar a false cuando Supabase esté listo

export const login = async (email, password) => {
  try {
    // 🚧 MODO TEMPORAL: Bypass de Supabase
    if (USE_TEMP_LOGIN) {
      console.log('🚧 MODO DEVELOPMENT: Usando login temporal')
      
      // Simular delay para que se vea real
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Validar credenciales básicas (opcional)
      if (email === 'empleado@comfachoco.com' && password === '123456') {
        
        // 🔥 IMPORTANTE: Guardar en localStorage INMEDIATAMENTE
        localStorage.setItem('user', JSON.stringify(TEMP_USER))
        localStorage.setItem('token', 'temp-token-123')
        
        return {
          user: TEMP_USER,
          token: 'temp-token-123'
        }
      } else {
        throw new Error('Credenciales incorrectas')
      }
    }

    // 🔐 MODO PRODUCCIÓN: Supabase real (comentado temporalmente)
    /*
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message)
    }

    // Obtener perfil del usuario desde Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      throw new Error('Error al obtener el perfil del usuario')
    }

    // Validar que tiene documento para N8N
    if (!profile.document_number) {
      throw new Error('Usuario sin número de documento configurado')
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile.name,
        role: profile.role,
        department: profile.department,
        documento: profile.document_number,
      },
      token: data.session.access_token
    }
    */

  } catch (error) {
    console.error('Error en login:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    if (USE_TEMP_LOGIN) {
      console.log('🚧 MODO DEVELOPMENT: Logout temporal')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return
    }

    // Código real de Supabase (comentado)
    /*
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    */
    
  } catch (error) {
    console.error('Error en logout:', error)
    throw error
  }
}

export const getCurrentUser = async () => {
  try {
    if (USE_TEMP_LOGIN) {
      // Verificar si hay usuario temporal guardado
      const userStr = localStorage.getItem('user')
      if (userStr) {
        console.log('🔍 Usuario encontrado en localStorage:', JSON.parse(userStr))
        return JSON.parse(userStr)
      }
      console.log('❌ No hay usuario en localStorage')
      return null
    }

    // Código real de Supabase (comentado)
    /*
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) return null

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error('Error al obtener perfil:', error)
      return null
    }

    return {
      id: session.user.id,
      email: session.user.email,
      name: profile.name,
      role: profile.role,
      department: profile.department,
      documento: profile.document_number
    }
    */

  } catch (error) {
    console.error('Error al obtener usuario actual:', error)
    return null
  }
}

export const onAuthStateChange = (callback) => {
  if (USE_TEMP_LOGIN) {
    // En modo temporal, ejecutar callback inmediatamente si hay usuario
    const userStr = localStorage.getItem('user')
    if (userStr) {
      callback(JSON.parse(userStr))
    }
    
    // Retornar función de cleanup vacía
    return () => {}
  }

  // Código real de Supabase (comentado)
  /*
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      const user = await getCurrentUser()
      callback(user)
    } else {
      callback(null)
    }
  })
  */

  return () => {}
}

/* import api from './api';

 // Mock users para desarrollo
const mockUsers = {
  'empleado@comfachoco.com': {
    password: '123456',
    user: {
      id: 1,
      name: 'Juan Pérez',
      email: 'empleado@comfachoco.com',
      role: 'employee',
      department: 'Desarrollo',
    },
    token: 'mock-token-employee-123',
  },
  'supervisor@comfachoco.com': {
    password: '123456',
    user: {
      id: 2,
      name: 'María García',
      email: 'supervisor@comfachoco.com',
      role: 'supervisor',
      department: 'Operaciones',
    },
    token: 'mock-token-supervisor-456',
  },
  'rrhh@comfachoco.com': {
    password: '123456',
    user: {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'rrhh@comfachoco.com',
      role: 'hr',
      department: 'Recursos Humanos',
    },
    token: 'mock-token-hr-789',
  },
};

export const login = async (email, password) => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validar usuario mock
  const mockUser = mockUsers[email];

  if (!mockUser || mockUser.password !== password) {
    throw new Error('Credenciales incorrectas');
  }

  // Guardar token
  localStorage.setItem('token', mockUser.token);
  localStorage.setItem('user', JSON.stringify(mockUser.user));

  return {
    user: mockUser.user,
    token: mockUser.token,
  };

  // API real (comentada para desarrollo)
  // const response = await api.post('/auth/login', { email, password });
  // if (response.data.token) {
  //   localStorage.setItem('token', response.data.token);
  // }
  // return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }

  // API real (comentada para desarrollo)
  // const response = await api.get('/auth/me');
  // return response.data;

  return null;
}; */

