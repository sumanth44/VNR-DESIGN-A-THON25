import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useEditorStore } from '../../store/editorStore';
import { DraggableComponent } from '../../types';
import ComponentRenderer from './ComponentRenderer';

interface DraggableItemProps {
  component: DraggableComponent;
  isSelected: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ component, isSelected }) => {
  const { selectComponent, removeComponent } = useEditorStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
  });
  
  const style = {
    position: 'absolute' as const,
    top: component.position.y,
    left: component.position.x,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isSelected ? 10 : 1,
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(component.id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(component.id);
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isSelected ? 'ring-2 ring-violet-500' : ''}`}
      onClick={handleClick}
    >
      <div 
        {...listeners} 
        {...attributes}
        className="absolute top-0 right-0 bg-violet-500 text-white p-1 cursor-move z-10"
      >
        ⋮
      </div>
      
      {isSelected && (
        <button
          className="absolute top-0 right-8 bg-red-500 text-white p-1 z-10"
          onClick={handleDelete}
        >
          ✕
        </button>
      )}
      
      <ComponentRenderer component={component} />
    </div>
  );
};

export default DraggableItem;