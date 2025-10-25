import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfWeek, endOfWeek, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Obtener fecha actual en zona horaria de Colombia (America/Bogota)
 */
const getTodayInColombia = () => {
  const now = new Date();
  // Convertir a string en zona horaria de Colombia y crear nueva fecha
  const colombiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  return startOfDay(colombiaTime);
};

/**
 * Calendario mini para selección de fechas - Rediseñado
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

  // Días de la semana
  const weekDays = [
    { key: 'dom', label: 'Dom' },
    { key: 'lun', label: 'Lun' },
    { key: 'mar', label: 'Mar' },
    { key: 'mie', label: 'Mié' },
    { key: 'jue', label: 'Jue' },
    { key: 'vie', label: 'Vie' },
    { key: 'sab', label: 'Sáb' }
  ];

  const isSelected = (day) => {
    return selectedDates.some(selectedDate =>
      isSameDay(new Date(selectedDate), day)
    );
  };

  const isPast = (day) => {
    const todayColombia = getTodayInColombia();
    return isBefore(day, todayColombia);
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
    <div>
      {/* Header con mes y navegación */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        padding: '0 4px'
      }}>
        {onMonthChange && (
          <button
            onClick={handlePrevMonth}
            style={{
              padding: '6px',
              borderRadius: '8px',
              transition: 'all 0.2s',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Mes anterior"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronLeft size={18} style={{ color: '#04B45F' }} />
          </button>
        )}

        <h3 style={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          color: '#303030',
          fontSize: '1rem',
          textTransform: 'capitalize',
          margin: 0,
        }}>
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h3>

        {onMonthChange && (
          <button
            onClick={handleNextMonth}
            style={{
              padding: '6px',
              borderRadius: '8px',
              transition: 'all 0.2s',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Mes siguiente"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronRight size={18} style={{ color: '#04B45F' }} />
          </button>
        )}
      </div>

      {/* Tabla del calendario */}
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th
                key={day.key}
                style={{
                  textAlign: 'center',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: '#8A8A8A',
                  paddingBottom: '8px',
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
                const todayColombia = getTodayInColombia();
                const isToday = isSameDay(day, todayColombia);
                const past = isPast(day);

                // Determinar estilos según estado
                let bgColor = 'transparent';
                let textColor = '#303030';
                let borderColor = 'transparent';
                let fontWeight = 500;

                if (!isCurrentMonth) {
                  textColor = '#d1d5db';
                } else if (selected) {
                  bgColor = '#04B45F';
                  textColor = '#FFFFFF';
                  fontWeight = 700;
                } else if (isToday) {
                  bgColor = '#62BFE6';
                  textColor = '#FFFFFF';
                  borderColor = '#62BFE6';
                  fontWeight = 700;
                } else if (past) {
                  bgColor = '#f3f4f6';
                  textColor = '#9ca3af';
                } else {
                  textColor = '#303030';
                }

                return (
                  <td key={dayIndex}>
                    <button
                      onClick={() => onDateClick && onDateClick(day)}
                      disabled={!isCurrentMonth}
                      style={{
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s',
                        border: `2px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        color: textColor,
                        cursor: isCurrentMonth ? 'pointer' : 'not-allowed',
                        fontWeight: fontWeight,
                        padding: 0,
                      }}
                      title={format(day, 'dd/MM/yyyy')}
                      onMouseEnter={(e) => {
                        if (isCurrentMonth) {
                          if (selected) {
                            e.currentTarget.style.backgroundColor = '#026636';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          } else if (isToday) {
                            e.currentTarget.style.backgroundColor = '#3da5d9';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          } else if (!past) {
                            e.currentTarget.style.backgroundColor = '#e0f2fe';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isCurrentMonth) {
                          e.currentTarget.style.backgroundColor = bgColor;
                          e.currentTarget.style.transform = 'scale(1)';
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
      <div style={{
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#62BFE6', borderRadius: '4px' }} />
          <span style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.75rem',
            color: '#8A8A8A',
          }}>Hoy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#04B45F', borderRadius: '4px' }} />
          <span style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.75rem',
            color: '#8A8A8A',
          }}>Seleccionado</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#f3f4f6', borderRadius: '4px' }} />
          <span style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.75rem',
            color: '#8A8A8A',
          }}>Días pasados</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarMini;
