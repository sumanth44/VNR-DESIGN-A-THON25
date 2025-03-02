import React from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '../../types';
import Card from '../ui/Card';
import { Eye, Download, Tag } from 'lucide-react';

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      {/* If navigating internally */}
      
        <div className="relative h-48 overflow-hidden"   onClick={() => window.open("http://localhost:3003", "_blank")}>
          <img 
            src={theme.thumbnail} 
            alt={theme.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {theme.published && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Published
            </div>
          )}
        </div>
    

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{theme.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{theme.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Tag className="h-4 w-4 mr-1" />
          <span>{theme.category}</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span>{theme.downloads}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Download className="h-4 w-4 mr-1" />
            <span>{theme.downloads}</span>
          </div>
        </div>
      </div>

      {/* If navigating externally */}
    
    </Card>
  );
};

export default ThemeCard;