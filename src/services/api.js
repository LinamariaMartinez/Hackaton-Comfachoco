import axios from 'axios';

// ====================================
// AXIOS INSTANCE CON INTERCEPTORS
// ====================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ====================================
// MOCK DATA
// ====================================

const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 600));

const mockRequests = [
  {
    id: 1,
    employeeId: 1,
    employee: {
      name: 'Juan Pérez',
      department: 'Desarrollo',
      email: 'juan.perez@comfachoco.com',
    },
    type: 'Vacaciones',
    startDate: '2025-11-01',
    endDate: '2025-11-05',
    days: 5,
    status: 'pending',
    reason: 'Vacaciones familiares',
    createdAt: '2025-10-20T10:30:00Z',
  },
  {
    id: 2,
    employeeId: 2,
    employee: {
      name: 'María García',
      department: 'Marketing',
      email: 'maria.garcia@comfachoco.com',
    },
    type: 'Permiso Personal',
    startDate: '2025-10-28',
    endDate: '2025-10-28',
    days: 1,
    status: 'approved',
    reason: 'Cita médica',
    createdAt: '2025-10-18T14:20:00Z',
    approvedAt: '2025-10-19T09:15:00Z',
    approvedBy: 'supervisor@comfachoco.com',
  },
  {
    id: 3,
    employeeId: 1,
    employee: {
      name: 'Juan Pérez',
      department: 'Desarrollo',
      email: 'juan.perez@comfachoco.com',
    },
    type: 'Días compensatorios',
    startDate: '2025-12-15',
    endDate: '2025-12-17',
    days: 3,
    status: 'rejected',
    reason: 'Horas extras acumuladas',
    createdAt: '2025-10-15T08:00:00Z',
    rejectedAt: '2025-10-16T11:30:00Z',
    rejectedBy: 'supervisor@comfachoco.com',
    rejectionReason: 'Fecha coincide con cierre de proyecto',
  },
];

const mockDepartments = [
  {
    id: 1,
    name: 'Desarrollo',
    totalEmployees: 15,
    employeesOnLeave: 3,
    activeRequests: 5,
    percentage: 20,
  },
  {
    id: 2,
    name: 'Marketing',
    totalEmployees: 10,
    employeesOnLeave: 2,
    activeRequests: 3,
    percentage: 20,
  },
  {
    id: 3,
    name: 'Recursos Humanos',
    totalEmployees: 5,
    employeesOnLeave: 1,
    activeRequests: 2,
    percentage: 20,
  },
  {
    id: 4,
    name: 'Ventas',
    totalEmployees: 12,
    employeesOnLeave: 1,
    activeRequests: 4,
    percentage: 8,
  },
];

const mockAlerts = [
  {
    id: 1,
    title: 'Departamento de IT con alta demanda',
    description: '5 empleados solicitaron vacaciones la misma semana',
    severity: 'warning',
    date: '2025-10-23',
  },
  {
    id: 2,
    title: 'Balance de días bajo',
    description: '3 empleados con menos de 5 días disponibles',
    severity: 'info',
    date: '2025-10-22',
  },
];

// ====================================
// AUTH API
// ====================================

export const authAPI = {
  login: async (email, password) => {
    await mockDelay();
    // Mock implementado en auth.js
    return api.post('/auth/login', { email, password });
  },

  logout: async () => {
    await mockDelay();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  },

  me: async () => {
    await mockDelay();
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('No authenticated');
    return { data: JSON.parse(userStr) };
  },

  refreshToken: async () => {
    await mockDelay();
    return { data: { token: 'new-mock-token-' + Date.now() } };
  },
};

// ====================================
// REQUESTS API
// ====================================

export const requestsAPI = {
  getAll: async (filters = {}) => {
    await mockDelay();
    let filtered = [...mockRequests];

    if (filters.status) {
      filtered = filtered.filter((r) => r.status === filters.status);
    }
    if (filters.employeeId) {
      filtered = filtered.filter((r) => r.employeeId === filters.employeeId);
    }

    return { data: filtered };
  },

  getById: async (id) => {
    await mockDelay();
    const request = mockRequests.find((r) => r.id === parseInt(id));
    if (!request) throw new Error('Request not found');
    return { data: request };
  },

  create: async (requestData) => {
    await mockDelay();
    const newRequest = {
      id: mockRequests.length + 1,
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    return { data: newRequest };
  },

  approve: async (id, comments) => {
    await mockDelay();
    return {
      data: {
        id,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        comments,
      },
    };
  },

  reject: async (id, reason) => {
    await mockDelay();
    return {
      data: {
        id,
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        reason,
      },
    };
  },

  delete: async (id) => {
    await mockDelay();
    return { data: { success: true, id } };
  },
};

// ====================================
// BALANCE API
// ====================================

export const balanceAPI = {
  getByEmployee: async (employeeId) => {
    await mockDelay();
    return {
      data: {
        employeeId,
        totalDays: 15,
        usedDays: 5,
        remainingDays: 10,
        pendingRequests: 2,
        year: 2025,
      },
    };
  },

  getHistory: async (employeeId, year) => {
    await mockDelay();
    return {
      data: [
        {
          date: '2025-06-15',
          type: 'Vacaciones',
          days: 3,
          status: 'approved',
        },
        {
          date: '2025-08-10',
          type: 'Permiso Personal',
          days: 2,
          status: 'approved',
        },
      ],
    };
  },

  update: async (employeeId, balanceData) => {
    await mockDelay();
    return { data: { success: true, ...balanceData } };
  },
};

// ====================================
// CHATBOT API
// ====================================

export const chatbotAPI = {
  sendMessage: async (message) => {
    await mockDelay();

    const responses = [
      'Hola, estoy aquí para ayudarte con tus solicitudes de tiempo.',
      'Puedes preguntarme sobre tu balance de días, hacer solicitudes o consultar el estado de tus permisos.',
      'Para solicitar vacaciones, solo dime las fechas y yo me encargo del resto.',
      '¿Necesitas ayuda con algo más?',
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return {
      data: {
        message: randomResponse,
        timestamp: new Date().toISOString(),
      },
    };
  },

  getHistory: async () => {
    await mockDelay();
    return {
      data: [
        {
          id: 1,
          message: '¿Cuántos días tengo disponibles?',
          response: 'Tienes 10 días disponibles de vacaciones.',
          timestamp: '2025-10-22T10:00:00Z',
        },
      ],
    };
  },
};

// ====================================
// DEPARTMENTS API
// ====================================

export const departmentsAPI = {
  getAll: async () => {
    await mockDelay();
    return { data: mockDepartments };
  },

  getById: async (id) => {
    await mockDelay();
    const dept = mockDepartments.find((d) => d.id === parseInt(id));
    if (!dept) throw new Error('Department not found');
    return { data: dept };
  },

  getStats: async (departmentId) => {
    await mockDelay();
    return {
      data: {
        totalEmployees: 15,
        activeRequests: 5,
        approvedThisMonth: 12,
        rejectedThisMonth: 2,
      },
    };
  },
};

// ====================================
// ALERTS API
// ====================================

export const alertsAPI = {
  getAll: async () => {
    await mockDelay();
    return { data: mockAlerts };
  },

  markAsRead: async (alertId) => {
    await mockDelay();
    return { data: { success: true, alertId } };
  },
};

// ====================================
// STATS API (HR Dashboard)
// ====================================

export const statsAPI = {
  getGeneral: async () => {
    await mockDelay();
    return {
      data: {
        totalEmployees: 150,
        totalEmployeesChange: 5,
        requestsThisMonth: 45,
        requestsThisMonthChange: -10,
        employeesOnLeave: 12,
        employeesOnLeaveChange: 15,
        requestStats: {
          total: 45,
          pending: 12,
          approved: 28,
          rejected: 5,
        },
      },
    };
  },

  getByDepartment: async (departmentId) => {
    await mockDelay();
    return {
      data: {
        requests: 15,
        approved: 10,
        rejected: 2,
        pending: 3,
      },
    };
  },
};

// ====================================
// EXPORT DEFAULT
// ====================================

export default api;
