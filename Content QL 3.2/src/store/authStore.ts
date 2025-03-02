import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('authUser') || 'null'),
  isAuthenticated: !!localStorage.getItem('authToken'),

  login: async (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      const adminUser = { email, role: 'admin' };
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      localStorage.setItem('authToken', 'mockAdminToken');
      set({ user: adminUser, isAuthenticated: true });
      return true;
    }

    // Normal user authentication
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find((user: any) => user.email === email && user.password === password);

    if (foundUser) {
      const loggedInUser = { email: foundUser.email, role: 'user' };
      localStorage.setItem('authUser', JSON.stringify(loggedInUser));
      localStorage.setItem('authToken', 'mockUserToken');
      set({ user: loggedInUser, isAuthenticated: true });
      return true;
    }

    return false;
  },

  logout: () => {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    set({ user: null, isAuthenticated: false });
  }
}));
