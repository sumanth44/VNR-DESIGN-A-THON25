import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useEditorStore } from '../../store/editorStore';
import { 
  Type, 
  Image, 
  Layout, 
  Navigation, 
  Grid, 
  ListOrdered, 
  MessageSquare, 
  ShoppingCart 
} from 'lucide-react';

interface ComponentTypeProps {
  type: string;
  icon: React.ReactNode;
  label: string;
}

const ComponentType: React.FC<ComponentTypeProps> = ({ type, icon, label }) => {
  const { setDragging } = useEditorStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
    data: {
      type,
      isNew: true
    }
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab hover:border-violet-500 hover:shadow-md transition-all"
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
    >
      <div className="text-violet-600 mb-2">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
};

const ComponentPalette: React.FC = () => {
  const componentTypes = [
    { type: 'header', icon: <Type size={20} />, label: 'Header' },
    { type: 'image', icon: <Image size={20} />, label: 'Image' },
    { type: 'gallery', icon: <Grid size={20} />, label: 'Gallery' },
    { type: 'navigation', icon: <Navigation size={20} />, label: 'Navigation' },
    { type: 'features', icon: <Layout size={20} />, label: 'Features' },
    { type: 'testimonials', icon: <MessageSquare size={20} />, label: 'Testimonials' },
    { type: 'productList', icon: <ShoppingCart size={20} />, label: 'Products' },
    { type: 'blog', icon: <ListOrdered size={20} />, label: 'Blog Posts' },
  ];
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Components</h3>
      <div className="grid grid-cols-2 gap-3">
        {componentTypes.map((component) => (
          <ComponentType
            key={component.type}
            type={component.type}
            icon={component.icon}
            label={component.label}
          />
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Drag components onto the canvas
      </div>
    </div>
  );
};

export default ComponentPalette;