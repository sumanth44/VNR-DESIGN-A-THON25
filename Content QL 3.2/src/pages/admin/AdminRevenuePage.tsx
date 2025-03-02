import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import AdminSidebar from '../../components/admin/AdminSidebar';
import RevenueChart from '../../components/admin/RevenueChart';
import { DollarSign, TrendingUp, CreditCard, Calendar } from 'lucide-react';

const AdminRevenuePage: React.FC = () => {
  const { themes } = useThemeStore();
  
  // Calculate total revenue
  const totalRevenue = themes.reduce((sum, theme) => sum + theme.revenue, 0);
  
  // Sort themes by revenue
  const topThemes = [...themes]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>
          <p className="text-gray-600">Track platform revenue and financial metrics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-violet-100 rounded-full text-violet-600 mr-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-full text-pink-600 mr-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Growth</p>
                <p className="text-2xl font-bold">+15.2%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-violet-100 rounded-full text-violet-600 mr-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Transaction</p>
                <p className="text-2xl font-bold">$42.50</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-full text-pink-600 mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Projected Q4</p>
                <p className="text-2xl font-bold">$12,500</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Themes</h3>
            
            <div className="space-y-4">
              {topThemes.map((theme) => (
                <div key={theme.id} className="flex items-center">
                  <img 
                    src={theme.thumbnail} 
                    alt={theme.name} 
                    className="w-12 h-12 rounded object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{theme.name}</p>
                    <p className="text-sm text-gray-500">{theme.downloads} downloads</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${theme.revenue}</p>
                    <p className="text-xs text-green-500">+{Math.floor(Math.random() * 20)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">By Category</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Portfolio</span>
                    <span className="text-sm font-medium text-gray-900">$3,250</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-violet-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">E-Commerce</span>
                    <span className="text-sm font-medium text-gray-900">$2,100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Blog</span>
                    <span className="text-sm font-medium text-gray-900">$1,800</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-violet-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">By Time Period</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-medium text-gray-900">$2,850</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Last Month</span>
                    <span className="text-sm font-medium text-gray-900">$2,450</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-violet-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Year to Date</span>
                    <span className="text-sm font-medium text-gray-900">$7,150</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenuePage;