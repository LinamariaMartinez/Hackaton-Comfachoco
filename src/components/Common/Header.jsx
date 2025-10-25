import { Bell, User, LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHome = () => {
    // Navegar según rol del usuario
    switch (user?.role) {
      case 'employee':
        navigate('/empleado');
        break;
      case 'supervisor':
        navigate('/supervisor');
        break;
      case 'hr':
        navigate('/rrhh');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <header className="bg-[#2E7D5F] shadow-md sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Izquierda */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#2E7D5F] font-raleway font-bold text-xl">
                C
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-raleway font-bold text-white text-lg leading-tight">
                Comfachocó
              </span>
              <span className="font-roboto text-white text-xs opacity-90">
                Gestión
              </span>
            </div>
          </div>

          {/* Nav - Centro */}
          <nav className="hidden md:flex" role="navigation" aria-label="Navegación principal">
            <button
              onClick={handleHome}
              aria-label="Ir a inicio"
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-white hover:bg-white hover:bg-opacity-10
                transition-all duration-200
              "
            >
              <Home size={18} aria-hidden="true" />
              <span className="font-raleway font-medium">Inicio</span>
            </button>
          </nav>

          {/* Botones - Derecha */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notificaciones */}
            <button
              aria-label="Notificaciones"
              className="
                relative p-2 rounded-lg text-white
                hover:bg-white hover:bg-opacity-10
                transition-all duration-200
              "
            >
              <Bell size={20} aria-hidden="true" />
              {/* Badge de notificaciones */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-alert rounded-full" aria-label="Tiene notificaciones nuevas" />
            </button>

            {/* Usuario */}
            <button
              aria-label={`Perfil de ${user?.name || 'Usuario'}`}
              className="
                flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg
                text-white hover:bg-white hover:bg-opacity-10
                transition-all duration-200
              "
            >
              <div className="hidden sm:block text-right">
                <p className="font-raleway font-semibold text-sm leading-tight">
                  {user?.name || 'Usuario'}
                </p>
                <p className="font-roboto text-xs opacity-90">
                  {user?.role === 'employee'
                    ? 'Empleado'
                    : user?.role === 'supervisor'
                    ? 'Supervisor'
                    : user?.role === 'hr'
                    ? 'RRHH'
                    : 'Usuario'}
                </p>
              </div>

              <div className="w-9 h-9 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User size={18} className="text-white" aria-hidden="true" />
              </div>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              aria-label="Cerrar sesión"
              className="
                p-2 rounded-lg text-white
                hover:bg-red-600 hover:bg-opacity-20
                transition-all duration-200
              "
            >
              <LogOut size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Nav móvil - debajo del header */}
      <nav className="md:hidden bg-[#26674F] border-t border-white border-opacity-10" role="navigation" aria-label="Navegación móvil">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={handleHome}
            aria-label="Ir a inicio"
            className="
              w-full flex items-center justify-center gap-2 py-3
              text-white hover:bg-white hover:bg-opacity-10
              transition-all duration-200
            "
          >
            <Home size={18} aria-hidden="true" />
            <span className="font-raleway font-medium text-sm">Inicio</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
