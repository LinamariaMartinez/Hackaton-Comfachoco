import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfWeek, endOfWeek, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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
 * Calendario completo con eventos - Rediseñado
 * @param {Array} events - Array de eventos { date, name, type, color }
 *   - date: string ISO o Date
 *   - name: string (nombre de la persona)
 *   - type: string ('Vacaciones', 'Permiso', etc)
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

  const isPast = (day) => {
    const todayColombia = getTodayInColombia();
    return isBefore(day, todayColombia);
  };

  // Determinar estilo según eventos y fecha
  const getDayStyles = (dayEvents, isPastDay, isTodayDay) => {
    let bgColor = '#FFFFFF';
    let borderColor = '#e5e7eb';

    if (isPastDay && dayEvents.length === 0) {
      bgColor = '#f9fafb';
    } else if (isTodayDay) {
      borderColor = '#62BFE6';
      bgColor = '#f0f9ff';
    } else if (dayEvents.length > 0) {
      // Determinar color según eventos
      if (dayEvents.some(e => e.color === 'red')) {
        bgColor = '#fee2e2';
        borderColor = '#fca5a5';
      } else if (dayEvents.length > 2 || dayEvents.some(e => e.color === 'orange')) {
        bgColor = '#fed7aa';
        borderColor = '#fb923c';
      } else {
        bgColor = '#dcfce7';
        borderColor = '#86efac';
      }
    }

    return { bgColor, borderColor };
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
    <div>
      {/* Header con mes y navegación */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <button
          onClick={handlePrevMonth}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            transition: 'all 0.2s',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.875rem',
            color: '#8A8A8A',
          }}
          title="Mes anterior"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={20} style={{ color: '#04B45F' }} />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <h2 style={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: '#303030',
          textTransform: 'capitalize',
          margin: 0,
        }}>
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>

        <button
          onClick={handleNextMonth}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            transition: 'all 0.2s',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '0.875rem',
            color: '#8A8A8A',
          }}
          title="Mes siguiente"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight size={20} style={{ color: '#04B45F' }} />
        </button>
      </div>

      {/* Tabla del calendario */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th
                  key={day}
                  style={{
                    backgroundColor: '#04B45F',
                    border: '1px solid #026636',
                    padding: '12px 8px',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}
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
                  const todayColombia = getTodayInColombia();
                  const isTodayDay = isSameDay(day, todayColombia);
                  const isPastDay = isPast(day);
                  const dayEvents = getEventsForDay(day);
                  const { bgColor, borderColor } = getDayStyles(dayEvents, isPastDay, isTodayDay);

                  return (
                    <td
                      key={dayIndex}
                      style={{
                        border: isTodayDay ? `3px solid ${borderColor}` : `1px solid ${borderColor}`,
                        padding: '12px',
                        verticalAlign: 'top',
                        minHeight: '100px',
                        height: '120px',
                        transition: 'all 0.2s',
                        backgroundColor: !isCurrentMonth ? '#f9fafb' : bgColor,
                      }}
                    >
                      {/* Número del día */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}>
                        <span style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontWeight: isTodayDay ? 700 : 600,
                          fontSize: '1rem',
                          color: !isCurrentMonth
                            ? '#d1d5db'
                            : isTodayDay
                            ? '#62BFE6'
                            : isPastDay
                            ? '#9ca3af'
                            : '#303030',
                        }}>
                          {format(day, 'd')}
                        </span>
                        {dayEvents.length > 0 && (
                          <span style={{
                            backgroundColor: isTodayDay ? '#62BFE6' : '#04B45F',
                            color: '#FFFFFF',
                            fontSize: '0.75rem',
                            borderRadius: '9999px',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Raleway, sans-serif',
                            fontWeight: 'bold',
                          }}>
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* Lista de eventos (personas) */}
                      {isCurrentMonth && dayEvents.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          marginTop: '8px',
                        }}>
                          {dayEvents.slice(0, 3).map((event, idx) => {
                            let eventBg, eventText;
                            if (event.color === 'red') {
                              eventBg = '#fecaca';
                              eventText = '#991b1b';
                            } else if (event.color === 'orange') {
                              eventBg = '#fed7aa';
                              eventText = '#c2410c';
                            } else {
                              eventBg = '#bbf7d0';
                              eventText = '#166534';
                            }

                            return (
                              <div
                                key={idx}
                                style={{
                                  fontSize: '0.75rem',
                                  fontFamily: 'Roboto, sans-serif',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  backgroundColor: eventBg,
                                  color: eventText,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  fontWeight: 500,
                                }}
                                title={`${event.name} - ${event.type || 'Ausencia'}`}
                              >
                                {event.name}
                              </div>
                            );
                          })}
                          {dayEvents.length > 3 && (
                            <div style={{
                              fontSize: '0.75rem',
                              fontFamily: 'Roboto, sans-serif',
                              color: '#8A8A8A',
                              textAlign: 'center',
                              marginTop: '4px',
                              fontWeight: 500,
                            }}>
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
      <div style={{
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#dcfce7',
              border: '2px solid #86efac',
              borderRadius: '4px',
            }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#303030',
            }}>Normal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#fed7aa',
              border: '2px solid #fb923c',
              borderRadius: '4px',
            }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#303030',
            }}>Conflicto</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#fee2e2',
              border: '2px solid #fca5a5',
              borderRadius: '4px',
            }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#303030',
            }}>Crítico</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#f0f9ff',
              border: '3px solid #62BFE6',
              borderRadius: '4px',
            }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#303030',
            }}>Hoy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#f9fafb',
              border: '2px solid #e5e7eb',
              borderRadius: '4px',
            }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '0.875rem',
              color: '#303030',
            }}>Días pasados</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarFull;
