import { Check, X } from 'lucide-react';

const ApprovalButton = ({ type, onClick }) => {
  const isApprove = type === 'approve';

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-raleway font-semibold transition-colors ${
        isApprove
          ? 'bg-primary-green text-white hover:bg-primary-dark'
          : 'bg-red-500 text-white hover:bg-red-600'
      }`}
    >
      {isApprove ? <Check size={18} /> : <X size={18} />}
      {isApprove ? 'Aprobar' : 'Rechazar'}
    </button>
  );
};

export default ApprovalButton;
