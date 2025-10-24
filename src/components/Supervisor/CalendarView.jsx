import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarView = ({ requests = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-raleway font-bold text-xl text-gray-dark">
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="text-gray-dark" size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="text-gray-dark" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div
            key={day}
            className="text-center font-raleway font-semibold text-gray-medium text-sm py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayRequests = requests.filter((req) => {
            const reqDate = new Date(req.date);
            return reqDate.toDateString() === day.toDateString();
          });

          return (
            <div
              key={day.toISOString()}
              className={`min-h-20 p-2 border rounded-lg ${
                isSameMonth(day, currentDate)
                  ? 'bg-white border-gray-200'
                  : 'bg-gray-50 border-gray-100'
              } ${isToday(day) ? 'border-primary-green border-2' : ''}`}
            >
              <div
                className={`font-roboto text-sm mb-1 ${
                  isToday(day)
                    ? 'text-primary-green font-bold'
                    : 'text-gray-dark'
                }`}
              >
                {format(day, 'd')}
              </div>
              {dayRequests.length > 0 && (
                <div className="space-y-1">
                  {dayRequests.slice(0, 2).map((req, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-primary-green text-white px-1 py-0.5 rounded truncate"
                    >
                      {req.employee?.name}
                    </div>
                  ))}
                  {dayRequests.length > 2 && (
                    <div className="text-xs text-gray-medium">
                      +{dayRequests.length - 2} más
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
