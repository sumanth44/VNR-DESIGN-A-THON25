import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, setUsers }) => {
  // Handle Edit - Edit Name, Email, and Role
  const handleEdit = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const newName = prompt("Enter new name:", user.name);
    const newEmail = prompt("Enter new email:", user.email);
    const newRole = prompt("Enter new role (admin/user):", user.role);

    if (!newName || !newEmail || !newRole) return;

    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, name: newName, email: newEmail, role: newRole } : u
    );

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
