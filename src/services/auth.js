// Endpoint de N8N para autenticación
const N8N_AUTH_ENDPOINT = 'https://comfachoco.app.n8n.cloud/webhook/auth-login'

export const login = async (email, password) => {
  try {
    console.log('🔐 Intentando login con N8N...')

    const response = await fetch(N8N_AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Credenciales incorrectas')
    }

    const data = await response.json()

    // Validar que viene la información del usuario
    if (!data.user || !data.user.documento) {
      throw new Error('Respuesta de autenticación inválida')
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token || `token-${data.user.id}`)

    console.log('✅ Login exitoso:', data.user)

    return {
      user: data.user,
      token: data.token || `token-${data.user.id}`
    }

  } catch (error) {
    console.error('❌ Error en login:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    console.log('👋 Cerrando sesión...')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Error en logout:', error)
    throw error
  }
}

export const getCurrentUser = async () => {
  try {
    // Verificar si hay usuario guardado en localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      console.log('🔍 Usuario encontrado en localStorage:', user)
      return user
    }
    console.log('❌ No hay usuario en localStorage')
    return null
  } catch (error) {
    console.error('Error al obtener usuario actual:', error)
    return null
  }
}

export const onAuthStateChange = (callback) => {
  // En modo actual, ejecutar callback inmediatamente si hay usuario
  const userStr = localStorage.getItem('user')
  if (userStr) {
    callback(JSON.parse(userStr))
  }

  // Retornar función de cleanup vacía
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

