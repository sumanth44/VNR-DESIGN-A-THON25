import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/auth/LoginForm';
import { Palette } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');  // Redirect if already logged in
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="flex justify-center">
              <Palette className="h-12 w-12 text-violet-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-violet-600 hover:text-violet-500">
                create a new account
              </Link>
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
