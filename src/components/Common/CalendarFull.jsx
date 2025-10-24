import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

/**
 * Calendario completo con eventos
 * @param {Array} events - Array de eventos { date, name, type, color }
 *   - date: string ISO o Date
 *   - name: string (nombre de la persona)
 *   - type: string ('vacation', 'permission', etc)
 *   - color: string ('green', 'orange', 'red') opcional
 * @param {Date} initialMonth - Mes inicial a mostrar
 */
const CalendarFull = ({ events = [], initialMonth = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  // Obtener días del mes
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: es });
  const calendarEnd = endOfWeek(monthEnd, { locale: es });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Días de la semana
  const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Obtener eventos de un día específico
  const getEventsForDay = (day) => {
    return events.filter(event =>
      isSameDay(new Date(event.date), day)
    );
  };

  // Determinar color de fondo según eventos
  const getDayColor = (dayEvents) => {
    if (dayEvents.length === 0) return '';

    // Si hay eventos marcados explícitamente como rojos
    if (dayEvents.some(e => e.color === 'red')) {
      return 'bg-red-100 border-red-300';
    }

    // Si hay múltiples eventos (conflicto)
    if (dayEvents.length > 2 || dayEvents.some(e => e.color === 'orange')) {
      return 'bg-orange-100 border-orange-300';
    }

    // Eventos normales
    return 'bg-green-100 border-green-300';
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
      {/* Header con mes y navegación */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="
            p-2 hover:bg-gray-100 rounded-lg transition-colors
            flex items-center gap-2
          "
          title="Mes anterior"
        >
          <ChevronLeft size={20} className="text-gray-600" />
          <span className="hidden sm:inline font-roboto text-sm text-gray-600">
            Anterior
          </span>
        </button>

        <h2 className="font-raleway font-bold text-gray-dark text-xl sm:text-2xl capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>

        <button
          onClick={handleNextMonth}
          className="
            p-2 hover:bg-gray-100 rounded-lg transition-colors
            flex items-center gap-2
          "
          title="Mes siguiente"
        >
          <span className="hidden sm:inline font-roboto text-sm text-gray-600">
            Siguiente
          </span>
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Tabla del calendario */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th
                  key={day}
                  className="
                    bg-background-light border border-gray-200 p-2
                    font-raleway font-semibold text-sm text-gray-dark
                    text-center
                  "
                >
                  <span className="hidden md:inline">{day}</span>
                  <span className="md:hidden">{day.slice(0, 3)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Dividir días en semanas */}
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, new Date());
                  const dayEvents = getEventsForDay(day);
                  const colorClass = getDayColor(dayEvents);

                  return (
                    <td
                      key={dayIndex}
                      className={`
                        border border-gray-200 p-2 align-top
                        min-h-[80px] sm:min-h-[100px]
                        transition-colors
                        ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}
                        ${colorClass}
                        ${isToday ? 'ring-2 ring-primary-green ring-inset' : ''}
                      `}
                    >
                      {/* Número del día */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`
                            font-raleway font-semibold text-sm
                            ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-dark'}
                            ${isToday ? 'text-primary-green' : ''}
                          `}
                        >
                          {format(day, 'd')}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="
                            bg-primary-green text-white text-xs
                            rounded-full w-5 h-5 flex items-center justify-center
                            font-raleway font-bold
                          ">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* Lista de eventos (personas) */}
                      {isCurrentMonth && dayEvents.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div
                              key={idx}
                              className={`
                                text-xs font-roboto px-2 py-1 rounded
                                truncate
                                ${event.color === 'red'
                                  ? 'bg-red-200 text-red-800'
                                  : event.color === 'orange'
                                  ? 'bg-orange-200 text-orange-800'
                                  : 'bg-primary-green bg-opacity-20 text-primary-dark'
                                }
                              `}
                              title={`${event.name} - ${event.type || 'Ausencia'}`}
                            >
                              {event.name}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs font-roboto text-gray-medium text-center mt-1">
                              +{dayEvents.length - 3} más
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded" />
            <span className="font-roboto text-sm text-gray-dark">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded" />
            <span className="font-roboto text-sm text-gray-dark">Conflicto (múltiples ausencias)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded" />
            <span className="font-roboto text-sm text-gray-dark">Crítico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 ring-2 ring-primary-green rounded" />
            <span className="font-roboto text-sm text-gray-dark">Hoy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFull;
