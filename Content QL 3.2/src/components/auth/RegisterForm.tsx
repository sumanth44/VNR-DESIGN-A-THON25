import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve stored users
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const userExists = storedUsers.some((user: any) => user.email === email);
    if (userExists) {
      setError('User already exists. Please log in.');
      return;
    }

    // Create new user
    const newUser = { id: Date.now(), name, email, password };
    const updatedUsers = [...storedUsers, newUser];

    // Save updated users to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Automatically log in after registration
    localStorage.setItem('authUser', JSON.stringify(newUser));
    localStorage.setItem('authToken', 'mockToken123');

    login(email, password); // Update Zustand state
    navigate('/dashboard'); // Redirect after registration
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
