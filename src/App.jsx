import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './components/Common/LoadingSpinner';
import { useUserStore } from './store/userStore';

// Lazy loading de páginas para code splitting
const Login = lazy(() => import('./pages/Login'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboard'));
const SupervisorDashboard = lazy(() => import('./pages/SupervisorDashboard'));
const HRDashboard = lazy(() => import('./pages/HRDashboard'));

// Componente para proteger rutas privadas
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirigir según el rol del usuario
    switch (role) {
      case 'employee':
        return <Navigate to="/empleado" replace />;
      case 'supervisor':
        return <Navigate to="/supervisor" replace />;
      case 'hr':
        return <Navigate to="/rrhh" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Componente de loading para Suspense
const SuspenseLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F9F9FC',
  }}>
    <LoadingSpinner />
  </div>
);

function App() {
  const { isAuthenticated } = useUserStore();

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFFFFF',
            color: '#303030',
            fontFamily: 'Roboto, sans-serif',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#04B45F',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
        {/* Ruta pública - Login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/empleado" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Ruta para empleados */}
        <Route
          path="/empleado"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta para supervisores */}
        <Route
          path="/supervisor"
          element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SupervisorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta para RRHH */}
        <Route
          path="/rrhh"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 - Redirige según autenticación */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/empleado" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
