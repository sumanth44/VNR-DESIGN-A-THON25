import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';
import { Theme, Component } from '../types';

interface ThemeState {
  themes: Theme[];
  activeTheme: Theme | null;
  userThemes: Theme[];
  setActiveTheme: (theme: Theme) => void;
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  removeComponent: (id: string) => void;
  deleteTheme: (themeId: string) => void;
  publishTheme: (themeId: string) => void;
  createTheme: (theme: Partial<Theme>) => void;
  getThemeById: (id: string) => Theme | undefined;
  importThemeFromFile: (file: File) => Promise<void>;
}

// ==========================
// 📌 Sample Themes Data (Updated)
// ==========================
const sampleThemes: Theme[] = [
  {
    id: '1',
    name: 'Modern Portfolio',
    description: 'A sleek, modern portfolio theme for creative professionals',
    thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
    components: [],
    createdBy: '2',
    published: true,
    downloads: 245,
    revenue: 1225,
    category: 'Portfolio',
    tags: ['creative', 'modern', 'portfolio'],
    createdAt: '2023-09-15'
  },
  {
    id: '2',
    name: 'Business Pro',
    description: 'A professional theme for businesses and corporate websites.',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    components: [],
    createdBy: '3',
    published: true,
    downloads: 143,
    revenue: 998,
    category: 'Business',
    tags: ['corporate', 'professional', 'business'],
    createdAt: '2025-03-01'
  },
  {
    id: '3',
    name: 'Personal Portfolio',
    description: 'Showcase your projects and skills with a modern portfolio theme.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    components: [],
    createdBy: '4',
    published: false,
    downloads: 0,
    revenue: 0,
    category: 'Portfolio',
    tags: ['creative', 'developer', 'portfolio'],
    createdAt: '2025-03-01'
  },
  {
    id: '4',
    name: 'Tech Blog',
    description: 'A clean and content-focused theme for writers and bloggers.',
    thumbnail: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/03/shutterstock-free-professional-powerpoint-templates-cover.jpg',
    components: [],
    createdBy: '5',
    published: true,
    downloads: 45,
    revenue: 1230,
    category: 'Blog',
    tags: ['tech', 'writing', 'minimal'],
    createdAt: '2025-03-01'
  },
  {
    id: '5',
    name: 'E-Commerce Store',
    description: 'A ready-to-use template for online stores and e-commerce businesses.',
    thumbnail: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
    components: [],
    createdBy: '6',
    published: true,
    downloads: 78,
    revenue: 568,
    category: 'E-Commerce',
    tags: ['shop', 'store', 'products'],
    createdAt: '2025-03-01'
  },
  {
    id: '6',
    name: 'Photography Showcase',
    description: 'A stunning theme to highlight photography collections and galleries.',
    thumbnail: 'https://treeall.weebly.com/uploads/1/2/5/0/125060306/403564023.jpg',
    components: [],
    createdBy: '7',
    published: false,
    downloads: 0,
    revenue: 0,
    category: 'Photography',
    tags: ['photos', 'gallery', 'portfolio'],
    createdAt: '2025-03-01'
  }
];

export const useThemeStore = create<ThemeState>((set, get) => ({
  themes: sampleThemes,
  activeTheme: null,
  userThemes: [],

  setActiveTheme: (theme) => set({ activeTheme: theme }),

  addComponent: (component) => {
    const { activeTheme } = get();
    if (!activeTheme) return;

    const updatedTheme = {
      ...activeTheme,
      components: [...activeTheme.components, component]
    };

    set({ activeTheme: updatedTheme });
  },

  updateComponent: (id, updates) => {
    const { activeTheme } = get();
    if (!activeTheme) return;

    const updatedComponents = activeTheme.components.map(component =>
      component.id === id ? { ...component, ...updates } : component
    );

    const updatedTheme = {
      ...activeTheme,
      components: updatedComponents
    };

    set({ activeTheme: updatedTheme });
  },

  removeComponent: (id) => {
    const { activeTheme } = get();
    if (!activeTheme) return;

    const updatedComponents = activeTheme.components.filter(component => component.id !== id);

    set({ activeTheme: { ...activeTheme, components: updatedComponents } });
  },

  deleteTheme: (themeId) => {
    const { themes, activeTheme } = get();
    const updatedThemes = themes.filter(theme => theme.id !== themeId);
    
    set({ 
      themes: updatedThemes,
      activeTheme: activeTheme?.id === themeId ? null : activeTheme
    });
  },

  publishTheme: (themeId) => {
    const { themes } = get();
    const updatedThemes = themes.map(theme =>
      theme.id === themeId ? { ...theme, published: true } : theme
    );

    set({ themes: updatedThemes });
  },

  createTheme: (themeData) => {
    const { themes } = get();
    const newTheme: Theme = {
      id: `${themes.length + 1}`,
      name: themeData.name || 'Untitled Theme',
      description: themeData.description || 'No description',
      thumbnail: themeData.thumbnail || 'https://via.placeholder.com/150',
      components: themeData.components || [],
      createdBy: themeData.createdBy || '1',
      published: false,
      downloads: 0,
      revenue: 0,
      category: themeData.category || 'Other',
      tags: themeData.tags || [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    set({ themes: [...themes, newTheme] });
  },

  getThemeById: (id) => {
    const { themes } = get();
    return themes.find(theme => theme.id === id);
  },

  importThemeFromFile: async (file) => {
    const { themes } = get();
    try {
      const fileContent = await file.text();
      const parsedTheme: Partial<Theme> = JSON.parse(fileContent);
      
      if (!parsedTheme.name) {
        throw new Error('Invalid theme file: Missing name property');
      }

      const newTheme: Theme = {
        id: `${themes.length + 1}`,
        name: parsedTheme.name,
        description: parsedTheme.description || 'No description',
        thumbnail: parsedTheme.thumbnail || 'https://via.placeholder.com/150',
        components: parsedTheme.components || [],
        createdBy: parsedTheme.createdBy || '1',
        published: true,
        downloads: 0,
        revenue: 0,
        category: parsedTheme.category || 'Other',
        tags: parsedTheme.tags || [],
        createdAt: new Date().toISOString().split('T')[0]
      };

      set({ themes: [...themes, newTheme] });
    } catch (error) {
      console.error('Failed to import theme:', error);
    }
  }
}));
