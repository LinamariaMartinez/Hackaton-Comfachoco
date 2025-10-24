import api from './api';

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
};
