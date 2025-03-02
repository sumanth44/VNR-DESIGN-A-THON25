import React from 'react';
import { Theme } from '../../types';
import ThemeCard from './ThemeCard';

interface ThemeGridProps {
  themes: Theme[];
  title?: string;
}

const ThemeGrid: React.FC<ThemeGridProps> = ({ themes, title }) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
      
      {themes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No themes found</p>
        </div>
      )}
    </div>
  );
};

export default ThemeGrid;