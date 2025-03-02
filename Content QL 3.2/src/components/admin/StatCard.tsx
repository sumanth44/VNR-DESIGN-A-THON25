import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  positive = true,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className={`flex items-center mt-2 text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
              <span>{change}</span>
              <svg 
                className={`w-3 h-3 ml-1 ${positive ? '' : 'transform rotate-180'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-violet-100 rounded-full text-violet-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;