import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const RequestsWidget = ({ stats }) => {
  const items = [
    {
      label: 'Total',
      value: stats?.total || 0,
      icon: FileText,
      color: 'text-gray-dark',
      bgColor: 'bg-gray-100',
    },
    {
      label: 'Pendientes',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Aprobadas',
      value: stats?.approved || 0,
      icon: CheckCircle,
      color: 'text-primary-green',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Rechazadas',
      value: stats?.rejected || 0,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="card">
      <h3 className="font-raleway font-bold text-lg text-gray-dark mb-4">
        Estado de Solicitudes
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`${item.bgColor} rounded-lg p-4 flex items-center gap-3`}
            >
              <Icon className={item.color} size={24} />
              <div>
                <p className="font-roboto text-xs text-gray-medium">
                  {item.label}
                </p>
                <p className={`font-raleway font-bold text-2xl ${item.color}`}>
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestsWidget;
