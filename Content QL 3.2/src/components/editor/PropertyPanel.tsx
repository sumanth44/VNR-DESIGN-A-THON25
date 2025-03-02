import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import Button from '../ui/Button';
import Input from '../ui/Input';

const PropertyPanel: React.FC = () => {
  const { components, selectedComponentId, updateComponent } = useEditorStore();
  const [properties, setProperties] = useState<any>({});
  
  const selectedComponent = components.find(c => c.id === selectedComponentId);
  
  useEffect(() => {
    if (selectedComponent) {
      setProperties({
        ...selectedComponent.content,
        ...selectedComponent.style
      });
    } else {
      setProperties({});
    }
  }, [selectedComponent]);
  
  if (!selectedComponent) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-sm">Select a component to edit its properties</p>
      </div>
    );
  }
  
  const handleChange = (key: string, value: any) => {
    setProperties(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Determine if this is a content or style property
    const isContentProp = selectedComponent.content && key in selectedComponent.content;
    const isStyleProp = selectedComponent.style && key in selectedComponent.style;
    
    if (isContentProp) {
      updateComponent(selectedComponentId, {
        content: {
          ...selectedComponent.content,
          [key]: value
        }
      });
    } else if (isStyleProp) {
      updateComponent(selectedComponentId, {
        style: {
          ...selectedComponent.style,
          [key]: value
        }
      });
    }
  };
  
  const renderProperties = () => {
    switch (selectedComponent.type) {
      case 'header':
        return (
          <>
            <Input
              label="Title"
              value={properties.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <Input
              label="Subtitle"
              value={properties.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
            />
            <Input
              label="Background Color"
              value={properties.backgroundColor || '#111827'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
            />
            <Input
              label="Text Color"
              value={properties.textColor || '#ffffff'}
              onChange={(e) => handleChange('textColor', e.target.value)}
            />
            <Input
              label="Padding"
              value={properties.padding || '2rem'}
              onChange={(e) => handleChange('padding', e.target.value)}
            />
          </>
        );
        
      case 'image':
        return (
          <>
            <Input
              label="Image URL"
              value={properties.src || ''}
              onChange={(e) => handleChange('src', e.target.value)}
            />
            <Input
              label="Alt Text"
              value={properties.alt || ''}
              onChange={(e) => handleChange('alt', e.target.value)}
            />
            <Input
              label="Border Radius"
              value={properties.borderRadius || '0.5rem'}
              onChange={(e) => handleChange('borderRadius', e.target.value)}
            />
          </>
        );
        
      case 'navigation':
        return (
          <>
            <Input
              label="Logo Text"
              value={properties.logo || ''}
              onChange={(e) => handleChange('logo', e.target.value)}
            />
            <Input
              label="Background Color"
              value={properties.backgroundColor || '#4c1d95'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
            />
            <Input
              label="Text Color"
              value={properties.textColor || '#ffffff'}
              onChange={(e) => handleChange('textColor', e.target.value)}
            />
          </>
        );
        
      default:
        return (
          <p className="text-gray-500 text-sm">Basic properties available for this component type</p>
        );
    }
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Properties
      </h3>
      
      <div className="space-y-4">
        {renderProperties()}
      </div>
    </div>
  );
};

export default PropertyPanel;