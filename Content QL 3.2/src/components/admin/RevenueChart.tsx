import React from 'react';

const RevenueChart: React.FC = () => {
  // This is a simplified chart representation
  // In a real application, you would use a charting library like Chart.js or Recharts
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [1200, 1900, 1500, 2200, 2800, 3500];
  const maxValue = Math.max(...values);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between">
          {values.map((value, index) => {
            const height = (value / maxValue) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center w-1/6">
                <div 
                  className="w-full bg-violet-500 rounded-t-md"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{months[index]}</div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500">
          <div>$4000</div>
          <div>$3000</div>
          <div>$2000</div>
          <div>$1000</div>
          <div>$0</div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;