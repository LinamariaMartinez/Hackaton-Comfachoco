import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ApprovalButton from './ApprovalButton';

const RequestCard = ({ request, onApprove, onReject }) => {
  const { employee, type, startDate, endDate, status, reason } = request;

  const statusColors = {
    pending: 'bg-yellow-alert text-gray-dark',
    approved: 'bg-primary-green text-white',
    rejected: 'bg-red-500 text-white',
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-raleway font-semibold text-gray-dark">
              {employee?.name}
            </h3>
            <p className="font-roboto text-sm text-gray-medium">
              {employee?.department}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-raleway font-semibold ${
            statusColors[status]
          }`}
        >
          {status === 'pending' ? 'Pendiente' : status === 'approved' ? 'Aprobado' : 'Rechazado'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-dark">
          <Calendar size={18} className="text-primary-green" />
          <span className="font-roboto text-sm">
            {format(new Date(startDate), 'dd MMM yyyy', { locale: es })} -{' '}
            {format(new Date(endDate), 'dd MMM yyyy', { locale: es })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-dark">
          <Clock size={18} className="text-primary-green" />
          <span className="font-roboto text-sm font-semibold">{type}</span>
        </div>
      </div>

      {reason && (
        <div className="bg-background-light p-3 rounded-lg mb-4">
          <p className="font-roboto text-sm text-gray-dark">
            <span className="font-semibold">Motivo:</span> {reason}
          </p>
        </div>
      )}

      {status === 'pending' && (
        <div className="flex gap-2">
          <ApprovalButton
            type="approve"
            onClick={() => onApprove(request.id)}
          />
          <ApprovalButton
            type="reject"
            onClick={() => onReject(request.id)}
          />
        </div>
      )}
    </div>
  );
};

export default RequestCard;
