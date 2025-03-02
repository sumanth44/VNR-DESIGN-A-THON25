import React, { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ThemeGrid from '../components/themes/ThemeGrid';
import { Search, Filter } from 'lucide-react';

const ThemesPage: React.FC = () => {
  const { themes } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Portfolio', 'E-Commerce', 'Blog', 'Business', 'Landing Page'];
  
  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          theme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || theme.category === selectedCategory;
    
    return matchesSearch && matchesCategory && theme.published;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Themes</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Discover professionally designed themes for your website. Customize them to match your brand and style.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedCategory === category
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <ThemeGrid themes={filteredThemes} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThemesPage;