import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ThemeTable from '../../components/admin/ThemeTable';
import Button from '../../components/ui/Button';
import { Plus, Search } from 'lucide-react';

const AdminThemesPage: React.FC = () => {
  const { themes, deleteTheme, addTheme } = useThemeStore();

  // Function to handle delete
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this theme?")) {
      deleteTheme(id);  // Correctly deletes from store
    }
  };

  // Function to handle Add Theme (Select file from PC)
  const handleAddTheme = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip,.json'; // Allow theme files (adjust as needed)

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];

        // Read file and add to store (Mock Data)
        const reader = new FileReader();
        reader.onload = () => {
          const newTheme = {
            id: Date.now().toString(),
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            category: "Custom",
            published: false,
            downloads: 0,
            revenue: 0,
            thumbnail: "https://via.placeholder.com/100", // Default placeholder
            createdAt: new Date().toISOString().split("T")[0],
          };

          addTheme(newTheme); // Adds new theme to state
          alert("Theme added successfully!");
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Themes</h1>
            <p className="text-gray-600">Manage platform themes</p>
          </div>

          {/* Add Theme Button */}
          <Button onClick={handleAddTheme}>
            <Plus className="h-5 w-5 mr-2" />
            Add Theme
          </Button>
        </div>

        {/* Pass Delete Handler */}
        <ThemeTable themes={themes} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminThemesPage;
