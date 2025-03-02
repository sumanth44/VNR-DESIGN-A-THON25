import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useEditorStore } from '../../store/editorStore';
import { DraggableComponent } from '../../types';
import DraggableItem from './DraggableItem';

const EditorCanvas: React.FC = () => {
  const { components, selectedComponentId } = useEditorStore();
  const { setNodeRef } = useDroppable({
    id: 'editor-canvas',
  });
  
  return (
    <div 
      ref={setNodeRef}
      className="bg-white border-2 border-dashed border-gray-300 rounded-lg flex-grow h-full min-h-[600px] relative overflow-auto"
    >
      {components.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <p className="mb-2">Drag and drop components here</p>
            <p className="text-sm">or select a template to get started</p>
          </div>
        </div>
      ) : (
        components.map((component: DraggableComponent) => (
          <DraggableItem
            key={component.id}
            component={component}
            isSelected={component.id === selectedComponentId}
          />
        ))
      )}
    </div>
  );
};

export default EditorCanvas;