import { Users } from 'lucide-react';

const DepartmentStatus = ({ departments = [] }) => {
  return (
    <div className="card">
      <h3 className="font-raleway font-bold text-lg text-gray-dark mb-4">
        Estado por Departamento
      </h3>

      <div className="space-y-3">
        {departments.map((dept, index) => (
          <div key={index} className="border-b border-gray-200 pb-3 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="text-primary-green" size={18} />
                <span className="font-raleway font-semibold text-gray-dark">
                  {dept.name}
                </span>
              </div>
              <span className="font-roboto text-sm text-gray-medium">
                {dept.activeRequests} solicitudes
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${dept.percentage}%` }}
              />
            </div>

            <div className="flex justify-between mt-1">
              <span className="font-roboto text-xs text-gray-medium">
                {dept.employeesOnLeave} de {dept.totalEmployees} empleados
              </span>
              <span className="font-roboto text-xs font-semibold text-primary-green">
                {dept.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentStatus;
