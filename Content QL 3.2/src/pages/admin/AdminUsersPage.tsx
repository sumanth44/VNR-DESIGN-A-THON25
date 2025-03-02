import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserTable from "../../components/admin/UserTable";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";  

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState([]);

  // Load users from localStorage on page load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  // Function to add a new user
  const handleAddUser = () => {
    const name = prompt("Enter user name:");
    const email = prompt("Enter user email:");
    const role = prompt("Enter user role (admin/user):");

    if (!name || !email || !role) return; 

    const newUser = { id: uuidv4(), name, email, role };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Users</h1>
          <Button onClick={handleAddUser} className="flex items-center">
            <Plus size={16} className="mr-2" />
            Add User
          </Button>
        </div>
        <UserTable users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
