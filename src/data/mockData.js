/**
 * Mock Data para Comfachocó Gestión
 * Datos realistas para Colombia - Noviembre 2024
 */

// ====================================
// USUARIOS
// ====================================
export const mockUsers = {
  empleado: {
    id: 1,
    name: 'Juan Pérez Gómez',
    email: 'empleado@comfachoco.com',
    role: 'employee',
    department: 'Tecnología',
    position: 'Desarrollador Senior',
    balance: {
      totalDays: 15,
      usedDays: 5,
      remainingDays: 10,
      pendingRequests: 2,
    },
  },
  supervisor: {
    id: 2,
    name: 'José García Martínez',
    email: 'supervisor@comfachoco.com',
    role: 'supervisor',
    department: 'Tecnología',
    position: 'Líder de Desarrollo',
    teamSize: 12,
    balance: {
      totalDays: 18,
      usedDays: 3,
      remainingDays: 15,
      pendingRequests: 0,
    },
  },
  rrhh: {
    id: 3,
    name: 'María Rodríguez López',
    email: 'rrhh@comfachoco.com',
    role: 'hr',
    department: 'Recursos Humanos',
    position: 'Coordinadora de RRHH',
  },
};

// ====================================
// SOLICITUDES (47 totales, 35 aprobadas)
// ====================================
export const mockRequests = [
  // Aprobadas (35)
  { id: 1, employeeName: 'María López Sánchez', department: 'Tecnología', type: 'Vacaciones', startDate: '2024-11-01', endDate: '2024-11-05', days: 5, status: 'approved', approvedBy: 'José García', approvedDate: '2024-10-25' },
  { id: 2, employeeName: 'Pedro Ramírez Torres', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-04', endDate: '2024-11-08', days: 5, status: 'approved', approvedBy: 'José García', approvedDate: '2024-10-26' },
  { id: 3, employeeName: 'Ana Martínez Díaz', department: 'Finanzas', type: 'Permiso Personal', startDate: '2024-11-06', endDate: '2024-11-06', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-10-28' },
  { id: 4, employeeName: 'Carlos Hernández Ruiz', department: 'Operaciones', type: 'Vacaciones', startDate: '2024-11-07', endDate: '2024-11-11', days: 5, status: 'approved', approvedBy: 'José García', approvedDate: '2024-10-29' },
  { id: 5, employeeName: 'Sofía Gómez Castro', department: 'Tecnología', type: 'Permiso Personal', startDate: '2024-11-08', endDate: '2024-11-08', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-01' },
  { id: 6, employeeName: 'Diego Torres Mejía', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-11', endDate: '2024-11-13', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-02' },
  { id: 7, employeeName: 'Laura Vargas Pérez', department: 'Tecnología', type: 'Permiso Médico', startDate: '2024-11-12', endDate: '2024-11-12', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-08' },
  { id: 8, employeeName: 'Miguel Ángel Rojas', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-13', endDate: '2024-11-15', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-05' },
  { id: 9, employeeName: 'Valentina Cruz Ortiz', department: 'Operaciones', type: 'Día Compensatorio', startDate: '2024-11-14', endDate: '2024-11-14', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-07' },
  { id: 10, employeeName: 'Andrés Morales Silva', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-18', endDate: '2024-11-20', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-10' },
  { id: 11, employeeName: 'Camila Reyes Jiménez', department: 'Tecnología', type: 'Permiso Personal', startDate: '2024-11-19', endDate: '2024-11-19', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-12' },
  { id: 12, employeeName: 'Santiago Medina Ríos', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-20', endDate: '2024-11-22', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-13' },
  { id: 13, employeeName: 'Isabella Navarro Cano', department: 'Operaciones', type: 'Permiso Médico', startDate: '2024-11-21', endDate: '2024-11-21', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-15' },
  { id: 14, employeeName: 'Sebastián Castro Vera', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-25', endDate: '2024-11-27', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-18' },
  { id: 15, employeeName: 'Daniela Flores Guzmán', department: 'Tecnología', type: 'Día Compensatorio', startDate: '2024-11-26', endDate: '2024-11-26', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-19' },
  { id: 16, employeeName: 'Nicolás Salazar Pardo', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-27', endDate: '2024-11-29', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-20' },
  { id: 17, employeeName: 'Gabriela Mendoza Luna', department: 'Operaciones', type: 'Permiso Personal', startDate: '2024-11-28', endDate: '2024-11-28', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-22' },
  { id: 18, employeeName: 'Felipe Acosta Ramos', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-05', endDate: '2024-11-07', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-10-28' },
  { id: 19, employeeName: 'Mariana Suárez Arias', department: 'Tecnología', type: 'Permiso Médico', startDate: '2024-11-09', endDate: '2024-11-09', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-03' },
  { id: 20, employeeName: 'Julián Vega Molina', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-12', endDate: '2024-11-14', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-06' },
  { id: 21, employeeName: 'Alejandra Gil Pacheco', department: 'Operaciones', type: 'Día Compensatorio', startDate: '2024-11-15', endDate: '2024-11-15', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-09' },
  { id: 22, employeeName: 'Mateo Aguilar Cortés', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-19', endDate: '2024-11-21', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-12' },
  { id: 23, employeeName: 'Valeria Paredes Niño', department: 'Tecnología', type: 'Permiso Personal', startDate: '2024-11-22', endDate: '2024-11-22', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-16' },
  { id: 24, employeeName: 'Lucas Quintero Vélez', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-25', endDate: '2024-11-26', days: 2, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-18' },
  { id: 25, employeeName: 'Emma Cardona Rincón', department: 'Operaciones', type: 'Permiso Médico', startDate: '2024-11-27', endDate: '2024-11-27', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-21' },
  { id: 26, employeeName: 'Tomás Beltrán Muñoz', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-06', endDate: '2024-11-08', days: 3, status: 'approved', approvedBy: 'José García', approvedDate: '2024-10-30' },
  { id: 27, embarployeeName: 'Lucía Ospina Castaño', department: 'Tecnología', type: 'Día Compensatorio', startDate: '2024-11-11', endDate: '2024-11-11', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-05' },
  { id: 28, employeeName: 'Martín Duque Arango', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-14', endDate: '2024-11-15', days: 2, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-08' },
  { id: 29, employeeName: 'Paula Henao Trujillo', department: 'Operaciones', type: 'Permiso Personal', startDate: '2024-11-18', endDate: '2024-11-18', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-12' },
  { id: 30, employeeName: 'Emilio Serrano Franco', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-21', endDate: '2024-11-22', days: 2, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-15' },
  { id: 31, employeeName: 'Regina Botero Londoño', department: 'Tecnología', type: 'Permiso Médico', startDate: '2024-11-25', endDate: '2024-11-25', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-19' },
  { id: 32, employeeName: 'Bruno Uribe Valencia', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-26', endDate: '2024-11-27', days: 2, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-20' },
  { id: 33, employeeName: 'Olivia Posada Cárdenas', department: 'Operaciones', type: 'Día Compensatorio', startDate: '2024-11-28', endDate: '2024-11-28', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-22' },
  { id: 34, employeeName: 'Maximiliano Zapata Gómez', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-29', endDate: '2024-11-29', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-23' },
  { id: 35, employeeName: 'Victoria Hurtado Soto', department: 'Tecnología', type: 'Permiso Personal', startDate: '2024-11-08', endDate: '2024-11-08', days: 1, status: 'approved', approvedBy: 'José García', approvedDate: '2024-11-02' },

  // Pendientes (9)
  { id: 36, employeeName: 'Juan Pérez Gómez', department: 'Tecnología', type: 'Vacaciones', startDate: '2024-11-10', endDate: '2024-11-14', days: 5, status: 'pending', requestDate: '2024-11-03' },
  { id: 37, employeeName: 'Claudia Mejía Ramírez', department: 'Comercial', type: 'Permiso Personal', startDate: '2024-11-16', endDate: '2024-11-16', days: 1, status: 'pending', requestDate: '2024-11-08' },
  { id: 38, employeeName: 'Ricardo Peña Salinas', department: 'Finanzas', type: 'Vacaciones', startDate: '2024-11-18', endDate: '2024-11-20', days: 3, status: 'pending', requestDate: '2024-11-10' },
  { id: 39, employeeName: 'Patricia Ávila Giraldo', department: 'Operaciones', type: 'Día Compensatorio', startDate: '2024-11-22', endDate: '2024-11-22', days: 1, status: 'pending', requestDate: '2024-11-14' },
  { id: 40, employeeName: 'Hernán Jaramillo Ortiz', department: 'Tecnología', type: 'Permiso Médico', startDate: '2024-11-23', endDate: '2024-11-23', days: 1, status: 'pending', requestDate: '2024-11-16' },
  { id: 41, employeeName: 'Beatriz Cano Montoya', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-25', endDate: '2024-11-26', days: 2, status: 'pending', requestDate: '2024-11-18' },
  { id: 42, employeeName: 'Gustavo León Herrera', department: 'Finanzas', type: 'Permiso Personal', startDate: '2024-11-27', endDate: '2024-11-27', days: 1, status: 'pending', requestDate: '2024-11-20' },
  { id: 43, employeeName: 'Natalia Orozco Pineda', department: 'Operaciones', type: 'Vacaciones', startDate: '2024-11-28', endDate: '2024-11-29', days: 2, status: 'pending', requestDate: '2024-11-21' },
  { id: 44, employeeName: 'Rodrigo Álvarez Bravo', department: 'Tecnología', type: 'Día Compensatorio', startDate: '2024-11-29', endDate: '2024-11-29', days: 1, status: 'pending', requestDate: '2024-11-22' },

  // Rechazadas (3)
  { id: 45, employeeName: 'Gloria Patiño Sierra', department: 'Comercial', type: 'Vacaciones', startDate: '2024-11-15', endDate: '2024-11-18', days: 4, status: 'rejected', approvedBy: 'José García', approvedDate: '2024-11-08', reason: 'Período crítico - capacidad insuficiente' },
  { id: 46, employeeName: 'Alberto Fonseca Duarte', department: 'Finanzas', type: 'Permiso Personal', startDate: '2024-11-20', endDate: '2024-11-21', days: 2, status: 'rejected', approvedBy: 'José García', approvedDate: '2024-11-13', reason: 'Conflicto con cierre contable' },
  { id: 47, employeeName: 'Cecilia Varela Rojas', department: 'Operaciones', type: 'Vacaciones', startDate: '2024-11-22', endDate: '2024-11-26', days: 5, status: 'rejected', approvedBy: 'José García', approvedDate: '2024-11-15', reason: 'Múltiples ausencias en el equipo' },
];

// ====================================
// CONFLICTOS PARA SUPERVISOR
// ====================================
export const mockConflicts = [
  {
    id: 1,
    title: 'Conflicto de Capacidad - Tecnología',
    names: ['Juan Pérez Gómez', 'Laura Gómez Castro'],
    employees: ['Juan Pérez Gómez', 'Laura Gómez Castro'],
    department: 'Tecnología',
    type: 'Vacaciones',
    dates: '15-18 Nov',
    startDate: '2024-11-15',
    endDate: '2024-11-18',
    capacity: 65,
    impact: 'Alto',
    reason: 'Dos desarrolladores clave ausentes simultáneamente, capacidad del equipo baja a 65%',
  },
  {
    id: 2,
    title: 'Incapacidad Médica - Operaciones',
    names: ['Carlos Rodríguez Ruiz'],
    employees: ['Carlos Rodríguez Ruiz'],
    department: 'Operaciones',
    type: 'Incapacidad',
    dates: '20-25 Nov',
    startDate: '2024-11-20',
    endDate: '2024-11-25',
    capacity: 73,
    impact: 'Medio',
    reason: 'Incapacidad médica durante período de cierre mensual',
  },
  {
    id: 3,
    title: 'Período Crítico - Comercial',
    names: ['Diego Torres Mejía', 'Andrés Morales Silva', 'Felipe Acosta Ramos'],
    employees: ['Diego Torres Mejía', 'Andrés Morales Silva', 'Felipe Acosta Ramos'],
    department: 'Comercial',
    type: 'Vacaciones',
    dates: '25-29 Nov',
    startDate: '2024-11-25',
    endDate: '2024-11-29',
    capacity: 58,
    impact: 'Crítico',
    reason: 'Tres vendedores ausentes durante cierre de ventas del mes',
  },
];

// ====================================
// ANALYTICS PARA RRHH
// ====================================
export const mockRRHHAnalytics = {
  totalEmployees: 87,
  totalRequests: 47,
  approvedRequests: 35,
  pendingRequests: 9,
  rejectedRequests: 3,
  approvalRate: 74.5, // 35/47
  avgProcessingTime: 2.3, // días
  totalDaysRequested: 128,
  totalDaysApproved: 95,
  departmentStats: [
    { department: 'Tecnología', employees: 23, requests: 15, approved: 11, pending: 3, rejected: 1, capacity: 78 },
    { department: 'Comercial', employees: 28, requests: 12, approved: 9, pending: 2, rejected: 1, capacity: 82 },
    { department: 'Finanzas', employees: 18, requests: 11, approved: 8, pending: 2, rejected: 1, capacity: 85 },
    { department: 'Operaciones', employees: 18, requests: 9, approved: 7, pending: 2, rejected: 0, capacity: 80 },
  ],
  monthlyTrend: [
    { month: 'Jul', requests: 32 },
    { month: 'Ago', requests: 28 },
    { month: 'Sep', requests: 35 },
    { month: 'Oct', requests: 41 },
    { month: 'Nov', requests: 47 },
  ],
  criticalDates: [
    { date: '2024-11-15', reason: 'Múltiples ausencias en Tecnología', severity: 'high' },
    { date: '2024-11-20', reason: 'Incapacidad en Operaciones durante cierre', severity: 'medium' },
    { date: '2024-11-25', reason: 'Período crítico en Comercial', severity: 'critical' },
  ],
};

// ====================================
// CONVERSACIÓN DEMO CHATBOT
// ====================================
export const mockChat = [
  {
    id: 1,
    text: '¡Hola! Soy tu asistente de Comfachocó. ¿En qué puedo ayudarte hoy?',
    sender: 'bot',
    time: '10:00',
    timestamp: '2024-11-05T10:00:00',
  },
  {
    id: 2,
    text: 'Hola, quiero saber cuántos días de vacaciones tengo disponibles',
    sender: 'user',
    time: '10:01',
    timestamp: '2024-11-05T10:01:00',
  },
  {
    id: 3,
    text: '📊 Tu balance actual:\n\n• Total de días: 15\n• Días usados: 5\n• Días disponibles: 10\n• Solicitudes pendientes: 2\n\n¿Quieres solicitar vacaciones?',
    sender: 'bot',
    time: '10:01',
    timestamp: '2024-11-05T10:01:30',
  },
  {
    id: 4,
    text: 'Sí, quiero solicitar vacaciones del 10 al 14 de noviembre',
    sender: 'user',
    time: '10:02',
    timestamp: '2024-11-05T10:02:00',
  },
  {
    id: 5,
    text: '✅ He analizado tu solicitud:\n\n📅 Fechas: 10-14 de noviembre (5 días)\n💼 Saldo actual: 10 días\n\n✅ Saldo suficiente\n✅ Sin conflictos de equipo\n✅ Capacidad del equipo: 78%\n\n¡Tu solicitud ha sido APROBADA AUTOMÁTICAMENTE! 🎉\n\nTe llegará una notificación de confirmación.',
    sender: 'bot',
    time: '10:02',
    timestamp: '2024-11-05T10:02:15',
  },
];

// ====================================
// DEPARTAMENTOS CON ALERTAS
// ====================================
export const mockDepartments = [
  {
    id: 1,
    name: 'Tecnología',
    employees: 23,
    capacity: 78,
    pendingRequests: 3,
    activeRequests: 5,
    alerts: [
      { type: 'warning', message: 'Capacidad por debajo del 80%', date: '2024-11-15' },
      { type: 'info', message: '3 solicitudes pendientes de aprobación', date: '2024-11-05' },
    ],
  },
  {
    id: 2,
    name: 'Comercial',
    employees: 28,
    capacity: 82,
    pendingRequests: 2,
    activeRequests: 4,
    alerts: [
      { type: 'critical', message: 'Período crítico 25-29 Nov - 3 vendedores ausentes', date: '2024-11-25' },
    ],
  },
  {
    id: 3,
    name: 'Finanzas',
    employees: 18,
    capacity: 85,
    pendingRequests: 2,
    activeRequests: 3,
    alerts: [
      { type: 'info', message: 'Cierre contable 20-22 Nov - disponibilidad limitada', date: '2024-11-20' },
    ],
  },
  {
    id: 4,
    name: 'Operaciones',
    employees: 18,
    capacity: 80,
    pendingRequests: 2,
    activeRequests: 3,
    alerts: [
      { type: 'warning', message: 'Incapacidad médica 20-25 Nov afecta capacidad', date: '2024-11-20' },
    ],
  },
];

// ====================================
// EVENTOS DEL CALENDARIO (Personas ausentes por día)
// ====================================
export const mockCalendarEvents = [
  // Semana 1 (1-3 Nov)
  { date: '2024-11-01', name: 'M.López', fullName: 'María López Sánchez', type: 'Vacaciones', department: 'Tecnología', color: 'green' },
  { date: '2024-11-01', name: 'I.García', fullName: 'Isabella García', type: 'Vacaciones', department: 'Operaciones', color: 'green' },
  { date: '2024-11-02', name: 'M.López', fullName: 'María López Sánchez', type: 'Vacaciones', department: 'Tecnología', color: 'green' },
  { date: '2024-11-02', name: 'I.García', fullName: 'Isabella García', type: 'Vacaciones', department: 'Operaciones', color: 'green' },

  // Semana 2 (4-8 Nov)
  { date: '2024-11-04', name: 'P.Ramírez', fullName: 'Pedro Ramírez Torres', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-04', name: 'M.López', fullName: 'María López Sánchez', type: 'Vacaciones', department: 'Tecnología', color: 'green' },
  { date: '2024-11-05', name: 'P.Ramírez', fullName: 'Pedro Ramírez Torres', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-05', name: 'M.López', fullName: 'María López Sánchez', type: 'Vacaciones', department: 'Tecnología', color: 'green' },
  { date: '2024-11-05', name: 'F.Acosta', fullName: 'Felipe Acosta Ramos', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-06', name: 'P.Ramírez', fullName: 'Pedro Ramírez Torres', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-06', name: 'A.Martínez', fullName: 'Ana Martínez Díaz', type: 'Permiso Personal', department: 'Finanzas', color: 'green' },
  { date: '2024-11-06', name: 'F.Acosta', fullName: 'Felipe Acosta Ramos', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-06', name: 'T.Beltrán', fullName: 'Tomás Beltrán Muñoz', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-07', name: 'P.Ramírez', fullName: 'Pedro Ramírez Torres', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-07', name: 'C.Hernández', fullName: 'Carlos Hernández Ruiz', type: 'Vacaciones', department: 'Operaciones', color: 'green' },
  { date: '2024-11-07', name: 'F.Acosta', fullName: 'Felipe Acosta Ramos', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-07', name: 'T.Beltrán', fullName: 'Tomás Beltrán Muñoz', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-08', name: 'P.Ramírez', fullName: 'Pedro Ramírez Torres', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-08', name: 'C.Hernández', fullName: 'Carlos Hernández Ruiz', type: 'Vacaciones', department: 'Operaciones', color: 'green' },
  { date: '2024-11-08', name: 'S.Gómez', fullName: 'Sofía Gómez Castro', type: 'Permiso Personal', department: 'Tecnología', color: 'green' },
  { date: '2024-11-08', name: 'T.Beltrán', fullName: 'Tomás Beltrán Muñoz', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-08', name: 'V.Hurtado', fullName: 'Victoria Hurtado Soto', type: 'Permiso Personal', department: 'Tecnología', color: 'green' },

  // Semana 3 (11-15 Nov) - CON CONFLICTOS
  { date: '2024-11-11', name: 'C.Hernández', fullName: 'Carlos Hernández Ruiz', type: 'Vacaciones', department: 'Operaciones', color: 'green' },
  { date: '2024-11-11', name: 'D.Torres', fullName: 'Diego Torres Mejía', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-11', name: 'L.Ospina', fullName: 'Lucía Ospina Castaño', type: 'Día Compensatorio', department: 'Tecnología', color: 'green' },
  { date: '2024-11-12', name: 'D.Torres', fullName: 'Diego Torres Mejía', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-12', name: 'L.Vargas', fullName: 'Laura Vargas Pérez', type: 'Permiso Médico', department: 'Tecnología', color: 'green' },
  { date: '2024-11-12', name: 'J.Quintero', fullName: 'Julián Vega Molina', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-13', name: 'D.Torres', fullName: 'Diego Torres Mejía', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-13', name: 'M.Rojas', fullName: 'Miguel Ángel Rojas', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-13', name: 'J.Quintero', fullName: 'Julián Vega Molina', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-14', name: 'M.Rojas', fullName: 'Miguel Ángel Rojas', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-14', name: 'V.Cruz', fullName: 'Valentina Cruz Ortiz', type: 'Día Compensatorio', department: 'Operaciones', color: 'green' },
  { date: '2024-11-14', name: 'J.Quintero', fullName: 'Julián Vega Molina', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-14', name: 'M.Duque', fullName: 'Martín Duque Arango', type: 'Vacaciones', department: 'Finanzas', color: 'green' },

  // CONFLICTO 1: 15-18 Nov (naranja)
  { date: '2024-11-15', name: 'J.Pérez', fullName: 'Juan Pérez Gómez', type: 'Vacaciones', department: 'Tecnología', color: 'orange' },
  { date: '2024-11-15', name: 'L.Gómez', fullName: 'Laura Gómez Castro', type: 'Vacaciones', department: 'Tecnología', color: 'orange' },
  { date: '2024-11-15', name: 'M.Rojas', fullName: 'Miguel Ángel Rojas', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-15', name: 'A.Gil', fullName: 'Alejandra Gil Pacheco', type: 'Día Compensatorio', department: 'Operaciones', color: 'green' },
  { date: '2024-11-15', name: 'M.Duque', fullName: 'Martín Duque Arango', type: 'Vacaciones', department: 'Finanzas', color: 'green' },

  // Semana 4 (18-22 Nov)
  { date: '2024-11-18', name: 'A.Morales', fullName: 'Andrés Morales Silva', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-18', name: 'P.Henao', fullName: 'Paula Henao Trujillo', type: 'Permiso Personal', department: 'Operaciones', color: 'green' },
  { date: '2024-11-19', name: 'A.Morales', fullName: 'Andrés Morales Silva', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-19', name: 'C.Reyes', fullName: 'Camila Reyes Jiménez', type: 'Permiso Personal', department: 'Tecnología', color: 'green' },
  { date: '2024-11-19', name: 'M.Aguilar', fullName: 'Mateo Aguilar Cortés', type: 'Vacaciones', department: 'Comercial', color: 'green' },

  // CONFLICTO 2: 20-25 Nov (rojo - incapacidad)
  { date: '2024-11-20', name: 'C.Rodríguez', fullName: 'Carlos Rodríguez Ruiz', type: 'Incapacidad', department: 'Operaciones', color: 'red' },
  { date: '2024-11-20', name: 'A.Morales', fullName: 'Andrés Morales Silva', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-20', name: 'S.Medina', fullName: 'Santiago Medina Ríos', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-21', name: 'C.Rodríguez', fullName: 'Carlos Rodríguez Ruiz', type: 'Incapacidad', department: 'Operaciones', color: 'red' },
  { date: '2024-11-21', name: 'S.Medina', fullName: 'Santiago Medina Ríos', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-21', name: 'I.Navarro', fullName: 'Isabella Navarro Cano', type: 'Permiso Médico', department: 'Operaciones', color: 'green' },
  { date: '2024-11-21', name: 'M.Aguilar', fullName: 'Mateo Aguilar Cortés', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-21', name: 'E.Serrano', fullName: 'Emilio Serrano Franco', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-22', name: 'C.Rodríguez', fullName: 'Carlos Rodríguez Ruiz', type: 'Incapacidad', department: 'Operaciones', color: 'red' },
  { date: '2024-11-22', name: 'S.Medina', fullName: 'Santiago Medina Ríos', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-22', name: 'V.Paredes', fullName: 'Valeria Paredes Niño', type: 'Permiso Personal', department: 'Tecnología', color: 'green' },
  { date: '2024-11-22', name: 'E.Serrano', fullName: 'Emilio Serrano Franco', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-23', name: 'C.Rodríguez', fullName: 'Carlos Rodríguez Ruiz', type: 'Incapacidad', department: 'Operaciones', color: 'red' },
  { date: '2024-11-24', name: 'C.Rodríguez', fullName: 'Carlos Rodríguez Ruiz', type: 'Incapacidad', department: 'Operaciones', color: 'red' },

  // CONFLICTO 3: 25-29 Nov (rojo - crítico comercial)
  { date: '2024-11-25', name: 'C.Rodríguez', fullName: 'Carlos Rodríguez Ruiz', type: 'Incapacidad', department: 'Operaciones', color: 'red' },
  { date: '2024-11-25', name: 'D.Torres', fullName: 'Diego Torres Mejía', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-25', name: 'A.Morales', fullName: 'Andrés Morales Silva', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-25', name: 'F.Acosta', fullName: 'Felipe Acosta Ramos', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-25', name: 'S.Castro', fullName: 'Sebastián Castro Vera', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-25', name: 'L.Quintero', fullName: 'Lucas Quintero Vélez', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-25', name: 'R.Botero', fullName: 'Regina Botero Londoño', type: 'Permiso Médico', department: 'Tecnología', color: 'green' },
  { date: '2024-11-26', name: 'D.Torres', fullName: 'Diego Torres Mejía', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-26', name: 'A.Morales', fullName: 'Andrés Morales Silva', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-26', name: 'F.Acosta', fullName: 'Felipe Acosta Ramos', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-26', name: 'S.Castro', fullName: 'Sebastián Castro Vera', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-26', name: 'L.Quintero', fullName: 'Lucas Quintero Vélez', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-26', name: 'D.Flores', fullName: 'Daniela Flores Guzmán', type: 'Día Compensatorio', department: 'Tecnología', color: 'green' },
  { date: '2024-11-26', name: 'B.Uribe', fullName: 'Bruno Uribe Valencia', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-27', name: 'D.Torres', fullName: 'Diego Torres Mejía', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-27', name: 'A.Morales', fullName: 'Andrés Morales Silva', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-27', name: 'F.Acosta', fullName: 'Felipe Acosta Ramos', type: 'Vacaciones', department: 'Comercial', color: 'red' },
  { date: '2024-11-27', name: 'S.Castro', fullName: 'Sebastián Castro Vera', type: 'Vacaciones', department: 'Comercial', color: 'green' },
  { date: '2024-11-27', name: 'N.Salazar', fullName: 'Nicolás Salazar Pardo', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-27', name: 'E.Cardona', fullName: 'Emma Cardona Rincón', type: 'Permiso Médico', department: 'Operaciones', color: 'green' },
  { date: '2024-11-27', name: 'B.Uribe', fullName: 'Bruno Uribe Valencia', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-28', name: 'G.Mendoza', fullName: 'Gabriela Mendoza Luna', type: 'Permiso Personal', department: 'Operaciones', color: 'green' },
  { date: '2024-11-28', name: 'O.Posada', fullName: 'Olivia Posada Cárdenas', type: 'Día Compensatorio', department: 'Operaciones', color: 'green' },
  { date: '2024-11-29', name: 'N.Salazar', fullName: 'Nicolás Salazar Pardo', type: 'Vacaciones', department: 'Finanzas', color: 'green' },
  { date: '2024-11-29', name: 'M.Zapata', fullName: 'Maximiliano Zapata Gómez', type: 'Vacaciones', department: 'Comercial', color: 'green' },
];

// ====================================
// EXPORT DEFAULT
// ====================================
export default {
  mockUsers,
  mockRequests,
  mockConflicts,
  mockRRHHAnalytics,
  mockChat,
  mockDepartments,
  mockCalendarEvents,
};
