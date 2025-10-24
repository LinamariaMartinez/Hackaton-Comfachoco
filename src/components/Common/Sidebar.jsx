import { LogOut } from 'lucide-react';
import Logo from './Logo';

/**
 * Sidebar reutilizable para todos los dashboards
 *
 * @param {Array} items - Array de items del menú { icon, label, onClick, count }
 * @param {string} activeItem - Label del item activo
 * @param {function} onLogout - Función para cerrar sesión
 */
const Sidebar = ({ items = [], activeItem = '', onLogout }) => {
  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header con Logo */}
      <div className="p-6 border-b border-gray-200">
        <Logo />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${
                      isActive
                        ? 'bg-primary-green text-white shadow-md'
                        : 'text-gray-dark hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={20}
                      className={`
                        ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-medium group-hover:text-primary-green'
                        }
                      `}
                    />
                    <span
                      className={`
                        font-raleway font-medium text-sm
                        ${isActive ? 'text-white' : 'text-gray-dark'}
                      `}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Badge contador */}
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`
                        px-2 py-0.5 rounded-full text-xs font-raleway font-semibold
                        ${
                          isActive
                            ? 'bg-white text-primary-green'
                            : 'bg-primary-green text-white'
                        }
                      `}
                    >
                      {item.count > 99 ? '99+' : item.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Separador */}
      <div className="border-t border-gray-200" />

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={onLogout}
          className="
            w-full flex items-center gap-3 px-4 py-3 rounded-lg
            text-gray-dark hover:bg-red-50 hover:text-red-600
            transition-all duration-200 group
          "
        >
          <LogOut
            size={20}
            className="text-gray-medium group-hover:text-red-600"
          />
          <span className="font-raleway font-medium text-sm">
            Cerrar Sesión
          </span>
        </button>
      </div>

      {/* Footer info */}
      <div className="p-4 bg-background-light border-t border-gray-200">
        <p className="text-xs text-gray-medium text-center font-roboto">
          Comfachocó Tiempo
        </p>
        <p className="text-xs text-gray-medium text-center font-roboto">
          v1.0.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
