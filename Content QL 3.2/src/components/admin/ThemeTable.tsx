import React from 'react';
import { Theme } from '../../types';

interface ThemeTableProps {
  themes: Theme[];
  onDelete: (id: string) => void;
}

const ThemeTable: React.FC<ThemeTableProps> = ({ themes, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Theme</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {themes.map((theme) => (
            <tr key={theme.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-md object-cover" src={theme.thumbnail} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{theme.name}</div>
                    <div className="text-sm text-gray-500">{theme.createdAt}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{theme.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                  theme.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {theme.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{theme.downloads}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${theme.revenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {/* Delete Button */}
                <button 
                  onClick={() => onDelete(theme.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThemeTable;
