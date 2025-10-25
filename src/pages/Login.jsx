import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { login } from '../services/auth';
import useUserStore from '../store/userStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      console.log('📤 Intentando login con:', email)
      const data = await login(email, password)
      console.log('✅ Login exitoso:', data)
      
      // 🔥 IMPORTANTE: Actualizar el store
      setUser(data.user)
      console.log('📝 Usuario guardado en store')
      
      toast.success('¡Bienvenido a Comfachocó Gestión!')
  
      // Esperar un poco antes de navegar
      setTimeout(() => {
        console.log('🚀 Navegando al dashboard...')
        switch (data.user.role) {
          case 'employee':
            navigate('/empleado')
            break
          case 'supervisor':
            navigate('/supervisor')
            break
          case 'hr':
            navigate('/rrhh')
            break
          default:
            navigate('/empleado')
        }
      }, 100)
      
    } catch (error) {
      console.error('❌ Error en login:', error)
      toast.error('Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #04B45F 0%, #026636 100%)' }}>
      {/* Accessibility: Skip to main content */}
      <a href="#login-form" className="skip-to-main">
        Saltar al formulario de inicio de sesión
      </a>

      {/* Card de Login */}
      <div className="w-full max-w-md" role="main">
        <div className="bg-white rounded-2xl shadow-2xl" style={{ padding: '2.5rem' }}>

          {/* Logo y Marca */}
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <div className="inline-flex items-center justify-center rounded-xl shadow-lg" style={{ width: '80px', height: '80px', backgroundColor: '#04B45F', marginBottom: '1rem' }}>
              <span className="text-white font-bold" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '2rem' }}>C</span>
            </div>
            <h1 className="font-bold" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1.875rem', color: '#303030', marginBottom: '0.5rem' }}>
              Comfachocó
            </h1>
            <p className="font-semibold" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.875rem', color: '#04B45F' }}>
              Gestión
            </p>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.875rem', color: '#8A8A8A', marginTop: '0.5rem' }}>
              Sistema de Gestión de Talento Humano
            </p>
          </div>

          {/* Mensaje de Bienvenida */}
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="font-bold" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1.5rem', color: '#303030', marginBottom: '0.5rem' }}>
              ¡Bienvenido!
            </h2>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.875rem', color: '#8A8A8A' }}>
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Formulario */}
          <form id="login-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} aria-label="Formulario de inicio de sesión">

            {/* Campo Email */}
            <div>
              <label htmlFor="email-input" className="font-semibold block" style={{ fontFamily: 'Raleway, sans-serif', color: '#303030', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Correo Electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8A8A8A' }} aria-hidden="true">
                  <Mail size={20} />
                </div>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-required="true"
                  aria-label="Correo electrónico"
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#303030',
                    fontSize: '1rem',
                    transition: 'all 0.2s'
                  }}
                  placeholder="ejemplo@comfachoco.com"
                  required
                  disabled={loading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#04B45F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(4, 180, 95, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password-input" className="font-semibold block" style={{ fontFamily: 'Raleway, sans-serif', color: '#303030', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8A8A8A' }} aria-hidden="true">
                  <Lock size={20} />
                </div>
                <input
                  id="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-required="true"
                  aria-label="Contraseña"
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#303030',
                    fontSize: '1rem',
                    transition: 'all 0.2s'
                  }}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#04B45F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(4, 180, 95, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-label={loading ? "Iniciando sesión..." : "Iniciar sesión"}
              aria-busy={loading}
              className="font-bold text-white flex items-center justify-center"
              style={{
                width: '100%',
                backgroundColor: loading ? '#8A8A8A' : '#04B45F',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                borderRadius: '0.5rem',
                fontFamily: 'Raleway, sans-serif',
                fontSize: '1rem',
                gap: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'all 0.2s',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#026636')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#04B45F')}
            >
              {loading ? (
                <LoadingSpinner size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Olvidaste tu contraseña */}
          <div className="text-center" style={{ marginTop: '1.5rem' }}>
            <a
              href="#"
              className="font-medium"
              style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.875rem', color: '#04B45F', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#026636'}
              onMouseLeave={(e) => e.target.style.color = '#04B45F'}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Credenciales Demo */}
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '0.5rem', border: '1px solid #BBF7D0' }}>
            <p className="font-semibold text-center" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', color: '#303030', marginBottom: '0.5rem' }}>
              Credenciales de Demostración
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'Roboto, sans-serif', color: '#4B5563' }}>
              <p className="text-center">
                <strong>Empleado:</strong> empleado@comfachoco.com / 123456
              </p>
              <p className="text-center">
                <strong>Supervisor:</strong> supervisor@comfachoco.com / 123456
              </p>
              <p className="text-center">
                <strong>RRHH:</strong> rrhh@comfachoco.com / 123456
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center" style={{ marginTop: '1.5rem' }}>
          <p className="text-white" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.875rem' }}>
            Comfachocó Gestión v1.0.0
          </p>
          <p className="text-white" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '0.75rem', opacity: 0.9, marginTop: '0.25rem' }}>
            © 2025 Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
