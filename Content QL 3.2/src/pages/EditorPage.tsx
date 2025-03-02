import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { useThemeStore } from '../store/themeStore';
import { useEditorStore } from '../store/editorStore';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/layout/Navbar';
import ComponentPalette from '../components/editor/ComponentPalette';
import EditorCanvas from '../components/editor/EditorCanvas';
import PropertyPanel from '../components/editor/PropertyPanel';
import Button from '../components/ui/Button';
import { Save, Eye, ArrowLeft } from 'lucide-react';

const EditorPage: React.FC = () => {
  const { activeTheme } = useThemeStore();
  const { components, addComponent, moveComponent, isDragging, setDragging } = useEditorStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    if (!activeTheme) {
      navigate('/themes');
    }
  }, [isAuthenticated, activeTheme, navigate]);
  
  const handleDragStart = (event: DragStartEvent) => {
    setDragging(true);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    setDragging(false);
    const { active, over } = event;
    
    if (over && over.id === 'editor-canvas') {
      const isNewComponent = active.data?.current?.isNew;
      
      if (isNewComponent) {
        const type = active.data?.current?.type;
        const position = { x: event.delta.x, y: event.delta.y };
        
        // Create a new component
        addComponent({
          id: `${type}-${Date.now()}`,
          type,
          content: {},
          style: {},
          position,
        });
      } else {
        // Move existing component
        moveComponent(active.id as string, {
          x: event.delta.x,
          y: event.delta.y,
        });
      }
    }
  };
  
  if (!activeTheme) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/themes')}
              className="text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Editing: {activeTheme.name}
            </h1>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-2">
                <ComponentPalette />
              </div>
              
              <div className="lg:col-span-7">
                <EditorCanvas />
              </div>
              
              <div className="lg:col-span-3">
                <PropertyPanel />
              </div>
            </div>
            
            <DragOverlay>
              {isDragging ? <div className="w-20 h-20 bg-violet-100 border-2 border-violet-500 rounded opacity-50" /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
    </div>
  );
};

export default EditorPage;