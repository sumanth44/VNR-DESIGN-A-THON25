import React from 'react';
import { Component } from '../../types';

interface ComponentRendererProps {
  component: Component;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const renderComponent = () => {
    switch (component.type) {
      case 'header':
        return (
          <div 
            style={{
              backgroundColor: component.style.backgroundColor || '#111827',
              color: component.style.textColor || '#ffffff',
              padding: component.style.padding || '2rem',
            }}
            className="w-64 text-center"
          >
            <h2 className="text-2xl font-bold mb-2">{component.content.title || 'Header Title'}</h2>
            <p>{component.content.subtitle || 'Subtitle text goes here'}</p>
          </div>
        );
        
      case 'image':
        return (
          <div className="w-64">
            <img 
              src={component.content.src || 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'} 
              alt={component.content.alt || 'Image'} 
              className="w-full h-auto rounded"
              style={{
                borderRadius: component.style.borderRadius || '0.5rem',
              }}
            />
          </div>
        );
        
      case 'gallery':
        return (
          <div 
            className="w-64 grid grid-cols-2 gap-2"
            style={{
              gap: component.style.gap || '0.5rem',
            }}
          >
            {(component.content.images || [
              'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1547119957-637f8679db1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
            ]).map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-auto rounded"
              />
            ))}
          </div>
        );
        
      case 'navigation':
        return (
          <div 
            className="w-64 p-3"
            style={{
              backgroundColor: component.style.backgroundColor || '#4c1d95',
              color: component.style.textColor || '#ffffff',
            }}
          >
            <div className="flex justify-between items-center">
              <div className="font-bold">{component.content.logo || 'Logo'}</div>
              <div className="flex space-x-3">
                {(component.content.links || ['Home', 'About', 'Contact']).map((link, index) => (
                  <div key={index} className="text-sm">{link}</div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'features':
        return (
          <div className="w-64 grid grid-cols-2 gap-3 p-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center p-2 bg-gray-50 rounded">
                <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  {item}
                </div>
                <div className="text-sm font-medium">Feature {item}</div>
              </div>
            ))}
          </div>
        );
        
      default:
        return (
          <div className="w-64 h-32 flex items-center justify-center bg-gray-100 rounded">
            {component.type} component
          </div>
        );
    }
  };
  
  return (
    <div className="component-renderer">
      {renderComponent()}
    </div>
  );
};

export default ComponentRenderer;