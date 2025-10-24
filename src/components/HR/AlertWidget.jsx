import { AlertTriangle } from 'lucide-react';

const AlertWidget = ({ alerts = [] }) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-yellow-alert" size={24} />
        <h3 className="font-raleway font-bold text-lg text-gray-dark">
          Alertas
        </h3>
      </div>

      {alerts.length === 0 ? (
        <p className="font-roboto text-gray-medium text-sm">
          No hay alertas en este momento
        </p>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-alert rounded-lg"
            >
              <AlertTriangle className="text-yellow-alert flex-shrink-0" size={18} />
              <div>
                <p className="font-raleway font-semibold text-sm text-gray-dark">
                  {alert.title}
                </p>
                <p className="font-roboto text-xs text-gray-medium mt-1">
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertWidget;
