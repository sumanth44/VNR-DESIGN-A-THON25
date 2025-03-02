import { create } from 'zustand';
import { DraggableComponent } from '../types';

interface EditorState {
  components: DraggableComponent[];
  selectedComponentId: string | null;
  isDragging: boolean;
  
  addComponent: (component: DraggableComponent) => void;
  updateComponent: (id: string, updates: Partial<DraggableComponent>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  setDragging: (isDragging: boolean) => void;
  moveComponent: (id: string, position: { x: number; y: number }) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  components: [],
  selectedComponentId: null,
  isDragging: false,
  
  addComponent: (component) => {
    set(state => ({
      components: [...state.components, component]
    }));
  },
  
  updateComponent: (id, updates) => {
    set(state => ({
      components: state.components.map(component => 
        component.id === id ? { ...component, ...updates } : component
      )
    }));
  },
  
  removeComponent: (id) => {
    set(state => ({
      components: state.components.filter(component => component.id !== id),
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId
    }));
  },
  
  selectComponent: (id) => {
    set({ selectedComponentId: id });
  },
  
  setDragging: (isDragging) => {
    set({ isDragging });
  },
  
  moveComponent: (id, position) => {
    set(state => ({
      components: state.components.map(component => 
        component.id === id ? { ...component, position } : component
      )
    }));
  }
}));