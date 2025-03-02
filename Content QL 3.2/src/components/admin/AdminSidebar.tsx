import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  DollarSign, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <Palette size={20} />, label: 'Themes', path: '/admin/themes' },
    { icon: <DollarSign size={20} />, label: 'Revenue', path: '/admin/revenue' },

  ];
  
  return (
    <div className="bg-black text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <Link to="/admin" className="flex items-center">
          <Palette className="h-8 w-8 text-pink-500 mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            ContentQL
          </span>
        </Link>
        <div className="text-xs text-gray-400 mt-1">Admin Panel</div>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-violet-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;