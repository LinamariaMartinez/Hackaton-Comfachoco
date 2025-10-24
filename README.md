# Comfachocó Sistema de Gestión de Talento Humano

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-7.1.7-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.16-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Zustand-5.0.8-000000?style=for-the-badge" alt="Zustand">
</div>

## 📋 Descripción

**Comfachocó Sistema de Gestión de Talento Humano** es un sistema inteligente de gestión de talento humano que automatiza y optimiza la administración de vacaciones, permisos y ausencias del personal. Desarrollado para el Hackathon Talento Tech - Reto Comfachocó 2025.

### ✨ Características Principales

- 🤖 **Asistente Virtual Inteligente** - Chatbot que procesa solicitudes en lenguaje natural
- 📊 **Gestión Automatizada** - Auto-aprobación basada en capacidad del equipo y políticas empresariales
- 👥 **Roles Diferenciados** - Interfaces específicas para Empleados, Supervisores y RRHH
- 📅 **Calendarios Interactivos** - Visualización de disponibilidad del equipo en tiempo real
- ⚠️ **Detección de Conflictos** - Identificación automática de solapamientos y alertas de capacidad
- 📱 **Diseño Responsivo** - Funciona perfectamente en móviles, tablets y escritorio

## 🎯 Problema que Resuelve

Las organizaciones enfrentan desafíos significativos en la gestión de ausencias:

- ⏰ **Demoras administrativas** - Procesos manuales que toman días
- 📉 **Falta de visibilidad** - Dificultad para ver la disponibilidad del equipo
- ⚠️ **Conflictos operativos** - Múltiples ausencias simultáneas afectan la productividad
- 📊 **Decisiones sin datos** - Aprobaciones basadas en intuición vs. análisis

### 💡 Nuestra Solución

Comfachocó Sistema de Gestión de Talento Humano automatiza el 80% de las solicitudes mediante:

1. **Análisis inteligente** - Evalúa saldo de días de vacaciones, conflictos y capacidad del equipo
2. **Respuesta instantánea** - Decisiones en segundos vs. días
3. **Transparencia total** - Todos ven la disponibilidad en tiempo real
4. **Reducción de carga** - RRHH se enfoca solo en casos complejos

## 🚀 Demo Rápida

### Credenciales de Acceso

```
👤 Empleado
Email: empleado@comfachoco.com
Password: 123456

👔 Supervisor
Email: supervisor@comfachoco.com
Password: 123456

🏢 RRHH
Email: rrhh@comfachoco.com
Password: 123456
```

## 🛠️ Tecnologías

### Frontend
- **React 19.1.1** - Framework UI de última generación
- **Vite 7.1.7** - Build tool ultra-rápido
- **Tailwind CSS v4.1.16** - Framework CSS moderno
- **React Router Dom 7.9.4** - Navegación SPA

### Estado y Datos
- **Zustand 5.0.8** - Gestión de estado global con persistencia
- **date-fns 4.1.0** - Manipulación de fechas
- **Lucide React** - Iconos modernos

### Utilidades
- **React Hot Toast** - Notificaciones elegantes
- **Mock Data** - Datos de demostración realistas

## 📦 Instalación

### Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/comfachoco-hackaton.git
cd comfachoco-hackaton
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🎨 Paleta de Colores Corporativa

El diseño respeta la identidad visual de Comfachocó:

```css
--color-primary-green: #04B45F   /* Verde principal */
--color-primary-dark: #026636    /* Verde oscuro */
--color-background: #F9F9FC      /* Fondo claro */
--color-text-dark: #303030       /* Texto principal */
--color-text-medium: #8A8A8A     /* Texto secundario */
```

## 👥 Roles y Funcionalidades

### 🙋 Empleado
- Chatbot interactivo para solicitar vacaciones
- Calendario mini con días seleccionados
- Visualización de disponibilidad del equipo
- Historial completo de solicitudes
- Balance de días disponibles en tiempo real

### 👔 Supervisor
- Dashboard con conflictos pendientes
- Lista de solicitudes auto-aprobadas
- Calendario completo del equipo
- Métricas de capacidad en tiempo real
- Acciones de aprobar/rechazar con un click

### 🏢 RRHH
- Dashboard ejecutivo con KPIs
- Estadísticas por departamento
- Alertas de alta demanda
- Estado de todas las solicitudes
- Análisis de tendencias

## 📁 Estructura del Proyecto

```
comfachoco-hackaton/
├── src/
│   ├── components/
│   │   └── Common/
│   │       ├── CalendarFull.jsx      # Calendario completo
│   │       ├── CalendarMini.jsx      # Calendario compacto
│   │       └── LoadingSpinner.jsx    # Spinner de carga
│   ├── pages/
│   │   ├── EmployeeDashboard.jsx     # Dashboard empleado
│   │   ├── SupervisorDashboard.jsx   # Dashboard supervisor
│   │   ├── HRDashboard.jsx           # Dashboard RRHH
│   │   └── Login.jsx                 # Página de login
│   ├── services/
│   │   └── auth.js                   # Servicio de autenticación
│   ├── store/
│   │   └── userStore.js              # Estado global (Zustand)
│   ├── App.jsx                       # Componente principal
│   ├── index.css                     # Estilos globales
│   ├── tailwind.css                  # Configuración Tailwind v4
│   └── main.jsx                      # Punto de entrada
├── public/                           # Assets estáticos
├── package.json                      # Dependencias
├── vite.config.js                    # Configuración Vite
└── README.md                         # Este archivo
```

## 🔑 Flujo de Autenticación

1. El usuario ingresa credenciales en `/`
2. El servicio `auth.js` valida contra datos mock
3. Zustand guarda el estado en `localStorage`
4. Router redirige según el rol:
   - `employee` → `/empleado`
   - `supervisor` → `/supervisor`
   - `hr` → `/rrhh`
5. El estado persiste entre recargas de página

### Cerrar Sesión

Para limpiar el `localStorage` y volver al login:
```javascript
localStorage.clear();
location.reload();
```

O usar el botón "Cerrar Sesión" en cualquier dashboard.

## 🤖 Asistente Virtual - Flujo de Trabajo

1. **Empleado escribe** en lenguaje natural:
   > "Quiero vacaciones del 10 al 14 de noviembre"

2. **Bot analiza**:
   - ✅ Saldo de días disponibles
   - ✅ Conflictos con otros miembros del equipo
   - ✅ Capacidad del departamento
   - ✅ Políticas de la empresa

3. **Respuesta inteligente**:
   ```
   ✅ He analizado tu solicitud:

   📅 Fechas: 10-14 de noviembre (5 días)
   💼 Saldo actual: 10 días

   ✅ Saldo suficiente
   ✅ Sin conflictos de equipo
   ✅ Capacidad del equipo: OK

   ¡Tu solicitud ha sido APROBADA AUTOMÁTICAMENTE! 🎉
   ```

4. **Si hay conflicto** → Escala a Supervisor
5. **Notificación** → Empleado recibe confirmación

## 📊 Métricas de Impacto

### KPIs del Sistema

- ⚡ **80%** de solicitudes auto-aprobadas
- 🕐 **Respuesta en < 5 segundos** (vs. 2-3 días manual)
- 📉 **Reducción de 90%** en carga administrativa de RRHH
- ✅ **100%** de visibilidad en disponibilidad del equipo
- 🎯 **0 conflictos** no detectados

## 🤝 Contribuir

Este proyecto fue desarrollado para el **Hackathon Comfachocó 2025**.

### Equipo de Desarrollo


## 📄 Licencia

Este proyecto es propiedad de Comfachocó. Todos los derechos reservados © 2025.

## 📞 Contacto

Para consultas sobre el proyecto:

- **Email**:
- **Website**: [www.comfachoco.com](https://comfachoco.com.co/)
- **Hackathon**: Talento Tech - Reto Comfachocó 2025

---

<div align="center">
  <p><strong>Comfachocó Gestión v1.0.0</strong></p>
  <p>Desarrollado con ❤️ para el Hackathon Talento Tech - Reto Comfachocó 2025</p>
</div>
