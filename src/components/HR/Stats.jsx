import { TrendingUp, TrendingDown } from 'lucide-react';

const Stats = ({ title, value, change, icon: Icon }) => {
  const isPositive = change >= 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-roboto text-gray-medium text-sm mb-1">{title}</p>
          <h3 className="font-raleway font-bold text-3xl text-gray-dark">
            {value}
          </h3>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp className="text-primary-green" size={16} />
            ) : (
              <TrendingDown className="text-red-500" size={16} />
            )}
            <span
              className={`font-roboto text-sm ${
                isPositive ? 'text-primary-green' : 'text-red-500'
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="font-roboto text-xs text-gray-medium">
              vs mes anterior
            </span>
          </div>
        </div>

        <div className="w-16 h-16 bg-primary-green bg-opacity-10 rounded-full flex items-center justify-center">
          <Icon className="text-primary-green" size={32} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
