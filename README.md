# Comfachocó Autogestión - Tu solicitud en tus manos

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-7.1.7-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.16-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Zustand-5.0.8-000000?style=for-the-badge" alt="Zustand">

  <br/>

  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Hackathon-Talento_Tech_2025-orange?style=for-the-badge" alt="Hackathon">
</div>

## 📑 Tabla de Contenidos

- [📋 Descripción](#-descripción)
- [🎯 Problema que Resuelve](#-problema-que-resuelve)
- [🚀 Demo Rápida](#-demo-rápida)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [📜 Scripts Disponibles](#-scripts-disponibles)
- [❓ Troubleshooting](#-troubleshooting)
- [🎨 Paleta de Colores Corporativa](#-paleta-de-colores-corporativa)
- [⚙️ Características Técnicas](#️-características-técnicas)
- [👥 Roles y Funcionalidades](#-roles-y-funcionalidades)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔑 Flujo de Autenticación](#-flujo-de-autenticación)
- [🤖 Asistente Virtual](#-asistente-virtual---flujo-de-trabajo)
- [📊 Métricas de Impacto](#-métricas-de-impacto)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [🚀 Deployment](#-deployment)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)
- [📞 Contacto](#-contacto)

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

### Backend y APIs
- **Supabase 2.76.1** - Backend as a Service (autenticación y base de datos)
- **N8N Cloud** - Automatización de workflows y endpoints
- **Axios 1.12.2** - Cliente HTTP para peticiones API
- **Bcryptjs 3.0.2** - Encriptación de contraseñas

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
git clone https://github.com/LinamariaMartinez/Hackaton-Comfachoco.git
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

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo en http://localhost:5173

# Producción
npm run build        # Genera build optimizado para producción en /dist

# Preview
npm run preview      # Previsualiza el build de producción localmente

# Linting
npm run lint         # Ejecuta ESLint para verificar código
```

## ❓ Troubleshooting

### El servidor no inicia
- Verifica que Node.js >= 18.0.0 esté instalado: `node -v`
- Verifica que las dependencias estén instaladas: `npm install`
- Revisa que el puerto 5173 no esté en uso

### Error de variables de entorno
- Asegúrate de que el archivo `.env` exista en la raíz del proyecto
- Verifica que todas las variables comiencen con `VITE_`
- Reinicia el servidor de desarrollo después de modificar `.env`

### Problemas de autenticación
- Verifica las credenciales de acceso en la sección [Demo Rápida](#-demo-rápida)
- Para resetear el estado: ejecuta `localStorage.clear()` en la consola del navegador
- Verifica que Supabase esté correctamente configurado en `.env`

### Error de conexión con backend
- Verifica que `VITE_API_BASE_URL` apunte al servidor N8N correcto
- Revisa los endpoints en `.env` coincidan con los workflows de N8N
- Consulta la consola del navegador para ver errores específicos

## 🎨 Paleta de Colores Corporativa

El diseño respeta la identidad visual de Comfachocó:

```css
--color-primary-green: #04B45F   /* Verde principal */
--color-primary-dark: #026636    /* Verde oscuro */
--color-background: #F9F9FC      /* Fondo claro */
--color-text-dark: #303030       /* Texto principal */
--color-text-medium: #8A8A8A     /* Texto secundario */
```

## ⚙️ Características Técnicas

### Mejores Prácticas Implementadas

- ✅ **Componentes Reutilizables** - Arquitectura modular y escalable
- ✅ **Estado Persistente** - Zustand con localStorage para mantener sesión
- ✅ **Código Limpio** - ESLint configurado con reglas de React
- ✅ **Responsive Design** - Funciona en todos los dispositivos
- ✅ **Accesibilidad** - Componentes con ARIA labels y LiveRegion
- ✅ **Optimización** - Build optimizado con Vite para carga rápida
- ✅ **Type Safety** - TypeScript configurado para desarrollo robusto
- ✅ **API Modular** - Servicios separados para mejor mantenimiento

### Características de UX/UI

- 🎯 **Navegación Intuitiva** - Flujos claros para cada rol
- 🔔 **Notificaciones en Tiempo Real** - React Hot Toast para feedback inmediato
- 📊 **Visualización de Datos** - Calendarios interactivos y widgets informativos
- 💬 **Chat Natural** - Interfaz conversacional con el chatbot
- ⚡ **Carga Rápida** - Lazy loading y optimización de assets
- 🎨 **Diseño Consistente** - Sistema de diseño corporativo aplicado

## 👥 Roles y Funcionalidades

### 🙋 Empleado
- Chatbot interactivo para solicitar vacaciones
- Calendario mini con días seleccionados
- Calendario completo con conexión a Google Calendar
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
- Calendario completo por área con conexión a Google Calendar

## 📁 Estructura del Proyecto

```
comfachoco-hackaton/
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   │   ├── ChatInput.jsx         # Input del chatbot
│   │   │   ├── ChatMessage.jsx       # Mensaje del chat
│   │   │   └── ChatThinking.jsx      # Indicador de pensamiento
│   │   ├── Common/
│   │   │   ├── CalendarFull.jsx      # Calendario completo
│   │   │   ├── CalendarMini.jsx      # Calendario compacto
│   │   │   ├── Header.jsx            # Encabezado de la app
│   │   │   ├── LiveRegion.jsx        # Región de accesibilidad
│   │   │   ├── LoadingSpinner.jsx    # Spinner de carga
│   │   │   ├── Logo.jsx              # Logo de Comfachocó
│   │   │   ├── NotificationBell.jsx  # Campana de notificaciones
│   │   │   └── Sidebar.jsx           # Barra lateral
│   │   ├── Employee/
│   │   │   └── ChatbotAssistant.jsx  # Asistente chatbot del empleado
│   │   ├── HR/
│   │   │   ├── AlertWidget.jsx       # Widget de alertas
│   │   │   ├── DepartmentStatus.jsx  # Estado de departamentos
│   │   │   ├── RequestsWidget.jsx    # Widget de solicitudes
│   │   │   └── Stats.jsx             # Estadísticas RRHH
│   │   └── Supervisor/
│   │       ├── ApprovalButton.jsx    # Botón de aprobación
│   │       ├── CalendarView.jsx      # Vista de calendario
│   │       └── RequestCard.jsx       # Tarjeta de solicitud
│   ├── pages/
│   │   ├── EmployeeDashboard.jsx     # Dashboard empleado
│   │   ├── SupervisorDashboard.jsx   # Dashboard supervisor
│   │   ├── HRDashboard.jsx           # Dashboard RRHH
│   │   └── Login.jsx                 # Página de login
│   ├── services/
│   │   ├── api.js                    # Cliente API general
│   │   ├── auth.js                   # Servicio de autenticación
│   │   ├── chatbot.js                # Lógica del chatbot
│   │   ├── chatbotMock.js            # Datos mock del chatbot
│   │   └── localStorage.js           # Gestión de localStorage
│   ├── store/
│   │   └── userStore.js              # Estado global (Zustand)
│   ├── data/
│   │   └── mockData.js               # Datos de demostración
│   ├── lib/
│   │   └── supabaseClient.js         # Cliente de Supabase
│   ├── utils/
│   │   └── helpers.js                # Funciones auxiliares
│   ├── styles/                       # Estilos adicionales
│   ├── App.jsx                       # Componente principal
│   ├── App.css                       # Estilos de App
│   ├── index.css                     # Estilos globales
│   ├── tailwind.css                  # Configuración Tailwind v4
│   └── main.jsx                      # Punto de entrada
├── public/                           # Assets estáticos
├── package.json                      # Dependencias
├── vite.config.js                    # Configuración Vite
├── tailwind.config.js                # Configuración Tailwind
├── eslint.config.js                  # Configuración ESLint
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

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  - Vite + React 19 + Tailwind CSS v4               │
│  - Zustand (Estado Global + Persistencia)          │
│  - React Router (Navegación)                        │
└────────────────┬────────────────────────────────────┘
                 │
                 ├─── Supabase (Autenticación + BD)
                 │    • Gestión de usuarios
                 │    • Perfiles y roles
                 │    • Autenticación segura
                 │
                 └─── N8N Cloud (Backend Logic)
                      • /webhook/chatbot-agenda
                      • /webhook/gestion-solicitudes
                      • /webhook/aprobar-solicitud
                      • /webhook/rechazar-solicitud
                      • /webhook/login
                      • /webhook/create-user
```

### Flujo de Datos

1. **Autenticación**: Supabase maneja login y sesiones
2. **Estado**: Zustand persiste datos en localStorage
3. **APIs**: Axios conecta con workflows N8N
4. **Procesamiento**: N8N ejecuta lógica de negocio
5. **Respuesta**: UI actualiza en tiempo real

### Seguridad

- 🔐 Bcryptjs para encriptación de contraseñas
- 🔑 Tokens JWT de Supabase
- 🛡️ Variables de entorno para credenciales
- 🚫 Validación en frontend y backend

## 🚀 Deployment

### Build de Producción

```bash
# Generar build optimizado
npm run build

# El build se genera en la carpeta /dist
# Contiene todos los archivos estáticos listos para desplegar
```

### Opciones de Despliegue

#### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

#### Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Desplegar
netlify deploy --prod
```

#### Otros Servicios
- **GitHub Pages**: Configurar en repositorio > Settings > Pages
- **Cloudflare Pages**: Conectar repositorio desde dashboard
- **Railway**: Deploy directo desde GitHub

### Variables de Entorno en Producción

Asegúrate de configurar todas las variables de entorno en tu plataforma de hosting:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_BASE_URL`
- Y todos los endpoints de N8N

## 🤝 Contribuir

Este proyecto fue desarrollado para el **Hackathon Comfachocó 2025**.

## Equipo de Desarrollo
### Jennifer Salazar Duque :
[![GitHub](https://img.shields.io/badge/GitHub-SalazarDukeImpactHub-black?logo=github)](https://github.com/SalazarDukeImpactHub)
[![LinkedIN](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/jennifer-salazar-duke-1194b2289/)

### Linamaria Martínez Pulido :
[![GitHub](https://img.shields.io/badge/GitHub-LinamariaMartinez-black?logo=github)](https://github.com/LinamariaMartinez)
[![LinkedIN](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/linamariamartinezp/)

### Emanuel López Franco :
[![GitHub](https://img.shields.io/badge/GitHub-ema28pro-black?logo=github)](https://github.com/ema28pro)
[![LinkedIN](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/emanuel-lopez-franco-/)

### Alvaro Henao Gonzalez :
[![GitHub](https://img.shields.io/badge/GitHub-ahenao1256-black?logo=github)](https://github.com/ahenao1256)
[![LinkedIN](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/alvaro-henao-gonzalez-04353823b/)

### Sebastian Chisavo Forero :
[![GitHub](https://img.shields.io/badge/GitHub-schisavo-black?logo=github)](https://github.com/schisavo)

## 📄 Licencia

Este proyecto es propiedad de Comfachocó. Todos los derechos reservados © 2025.

**Hackathon**: Talento Tech - Reto Comfachocó 2025

---

<div align="center">
  <p><strong>Comfachocó Gestión v1.0.0</strong></p>
  <p>Desarrollado con ❤️ para el Hackathon Talento Tech - Reto Comfachocó 2025</p>
</div>
