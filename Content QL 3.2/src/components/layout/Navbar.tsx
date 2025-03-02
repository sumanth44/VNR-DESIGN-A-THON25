import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import { Palette, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo & Navigation Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Palette className="h-8 w-8 text-pink-500 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                ContentQL
              </span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link to="/themes" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Themes
              </Link>
              <Link to="/features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Features
              </Link>
              <a href="http://localhost:5177" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                AI CHAT
              </a>
              <a href="http://localhost:3003" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                TEMP GEN
              </a>
              <Link to="/contact" className="text-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          
          {/* Right Side: Authentication Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* Display User Name */}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-300" />
                  <span className="text-sm font-medium text-white">
                    {user.name || 'User'}
                  </span>
                </div>
                
                {/* Dashboard Button */}
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                
                {/* Logout Button */}
                <button onClick={handleLogout} className="text-gray-300 hover:text-white flex items-center space-x-2">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
