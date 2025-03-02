import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ThemeGrid from '../components/themes/ThemeGrid';
import Button from '../components/ui/Button';
import { Plus, Palette, Download, Users } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { themes } = useThemeStore();
  const { user } = useAuthStore();
  <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
  // In a real app, we would filter themes by user ID
  const userThemes = themes.filter(theme => theme.createdBy === user?.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-violet-100 rounded-full text-violet-600 mr-4">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Your Themes</p>
                  <p className="text-2xl font-bold">{userThemes.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-pink-100 rounded-full text-pink-600 mr-4">
                  <Download className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Downloads</p>
                  <p className="text-2xl font-bold">
                    {userThemes.reduce((sum, theme) => sum + theme.downloads, 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-violet-100 rounded-full text-violet-600 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Community Rank</p>
                  <p className="text-2xl font-bold">#42</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Themes</h2>
              <Link to="/themes">
                <Button>
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Theme
                </Button>
              </Link>
            </div>
            
            {userThemes.length > 0 ? (
              <ThemeGrid themes={userThemes} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No themes yet</h3>
                <p className="text-gray-600 mb-6">
                  Start creating your first theme or customize an existing one.
                </p>
                <Link to="/themes">
                  <Button>
                    Browse Themes
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Themes</h2>
            <ThemeGrid 
              themes={themes
                .filter(theme => theme.published)
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, 3)} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;