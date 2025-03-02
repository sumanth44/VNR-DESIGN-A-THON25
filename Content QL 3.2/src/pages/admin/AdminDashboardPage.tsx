import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatCard from '../../components/admin/StatCard';
import RevenueChart from '../../components/admin/RevenueChart';
import ThemeTable from '../../components/admin/ThemeTable';
import { Users, Palette, DollarSign, Download } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { themes, publishTheme } = useThemeStore();
  const { user } = useAuthStore();
  
  // Mock data for admin dashboard
  const totalUsers = 1248;
  const totalThemes = themes.length;
  const totalRevenue = themes.reduce((sum, theme) => sum + theme.revenue, 0);
  const totalDownloads = themes.reduce((sum, theme) => sum + theme.downloads, 0);
  
  // Get recent themes
  const recentThemes = [...themes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={totalUsers} 
            icon={<Users size={24} />} 
            change="+12% from last month"
            positive={true}
          />
          
          <StatCard 
            title="Total Themes" 
            value={totalThemes} 
            icon={<Palette size={24} />} 
            change="+8% from last month"
            positive={true}
          />
          
          <StatCard 
            title="Total Revenue" 
            value={`$${totalRevenue}`} 
            icon={<DollarSign size={24} />} 
            change="+15% from last month"
            positive={true}
          />
          
          <StatCard 
            title="Total Downloads" 
            value={totalDownloads} 
            icon={<Download size={24} />} 
            change="+23% from last month"
            positive={true}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Statistics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">User Growth</span>
                  <span className="text-sm font-medium text-gray-700">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-violet-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Theme Submissions</span>
                  <span className="text-sm font-medium text-gray-700">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Revenue Target</span>
                  <span className="text-sm font-medium text-gray-700">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-violet-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">User Satisfaction</span>
                  <span className="text-sm font-medium text-gray-700">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Themes</h3>
          <ThemeTable themes={recentThemes} onPublish={publishTheme} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;