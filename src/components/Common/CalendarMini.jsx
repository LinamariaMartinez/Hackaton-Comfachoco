import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Calendario mini para selección de fechas
 * @param {Array} selectedDates - Array de fechas seleccionadas (Date objects)
 * @param {Date} currentMonth - Mes actual a mostrar
 * @param {function} onDateClick - Callback al hacer click en una fecha
 * @param {function} onMonthChange - Callback para cambiar mes (opcional)
 */
const CalendarMini = ({
  selectedDates = [],
  currentMonth = new Date(),
  onDateClick,
  onMonthChange
}) => {
  // Obtener días del mes
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: es });
  const calendarEnd = endOfWeek(monthEnd, { locale: es });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Días de la semana (con índices únicos para keys)
  const weekDays = [
    { key: 'dom', label: 'D' },
    { key: 'lun', label: 'L' },
    { key: 'mar', label: 'M' },
    { key: 'mie', label: 'M' },
    { key: 'jue', label: 'J' },
    { key: 'vie', label: 'V' },
    { key: 'sab', label: 'S' }
  ];

  const isSelected = (day) => {
    return selectedDates.some(selectedDate =>
      isSameDay(new Date(selectedDate), day)
    );
  };

  const handlePrevMonth = () => {
    if (onMonthChange) {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      onMonthChange(newMonth);
    }
  };

  const handleNextMonth = () => {
    if (onMonthChange) {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      onMonthChange(newMonth);
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '12px',
    }}>
      {/* Header con mes y navegación */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        {onMonthChange && (
          <button
            onClick={handlePrevMonth}
            style={{
              padding: '4px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
            title="Mes anterior"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronLeft size={16} style={{ color: '#8A8A8A' }} />
          </button>
        )}

        <h3 style={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 600,
          color: '#303030',
          fontSize: '0.875rem',
          textTransform: 'capitalize',
          margin: 0,
        }}>
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h3>

        {onMonthChange && (
          <button
            onClick={handleNextMonth}
            style={{
              padding: '4px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
            title="Mes siguiente"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ChevronRight size={16} style={{ color: '#8A8A8A' }} />
          </button>
        )}
      </div>

      {/* Tabla del calendario */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th
                key={day.key}
                style={{
                  textAlign: 'center',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.625rem',
                  color: '#8A8A8A',
                  paddingBottom: '6px',
                }}
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Dividir días en semanas (filas de 7 días) */}
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const selected = isSelected(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <td key={dayIndex} style={{ padding: '2px' }}>
                    <button
                      onClick={() => onDateClick && onDateClick(day)}
                      disabled={!isCurrentMonth}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s',
                        border: isToday && !selected ? '2px solid rgba(4, 180, 95, 0.5)' : 'none',
                        backgroundColor: selected ? '#04B45F' : 'transparent',
                        color: !isCurrentMonth ? '#d1d5db' : selected ? '#FFFFFF' : '#303030',
                        cursor: isCurrentMonth ? 'pointer' : 'not-allowed',
                        fontWeight: selected ? 600 : 400,
                        padding: '4px',
                      }}
                      title={format(day, 'dd/MM/yyyy')}
                      onMouseEnter={(e) => {
                        if (isCurrentMonth && !selected) {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        } else if (selected) {
                          e.currentTarget.style.backgroundColor = '#026636';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isCurrentMonth && !selected) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        } else if (selected) {
                          e.currentTarget.style.backgroundColor = '#04B45F';
                        }
                      }}
                    >
                      {format(day, 'd')}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Leyenda */}
      {selectedDates.length > 0 && (
        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid #e5e7eb',
        }}>
          <p style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.75rem',
            color: '#8A8A8A',
            textAlign: 'center',
            margin: 0,
          }}>
            {selectedDates.length} {selectedDates.length === 1 ? 'día seleccionado' : 'días seleccionados'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CalendarMini;
