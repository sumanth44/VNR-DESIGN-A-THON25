import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ThemeGrid from '../components/themes/ThemeGrid';
import Button from '../components/ui/Button';
import { Palette, Zap, Users, DollarSign, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const { themes } = useThemeStore();
  const featuredThemes = themes.filter(theme => theme.published).slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-black to-violet-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Create, Customize, and Share Dynamic Website Themes
                </h1>
                <p className="text-lg mb-8 text-gray-300">
                  ContentQL empowers developers to build beautiful, responsive websites with our intuitive drag-and-drop editor and customizable themes.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/themes">
                    <Button size="lg">
                      Explore Themes
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="ContentQL Platform" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to create stunning websites without writing a single line of code.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-violet-600 mb-4">
                  <Palette size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drag & Drop Editor</h3>
                <p className="text-gray-600">
                  Easily build your website with our intuitive drag-and-drop interface.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-pink-500 mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Design</h3>
                <p className="text-gray-600">
                  Get intelligent design suggestions based on industry trends.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-violet-600 mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-600">
                  Work together with your team in real-time on website projects.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-pink-500 mb-4">
                  <DollarSign size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Monetization</h3>
                <p className="text-gray-600">
                  Earn revenue by publishing your themes to the ContentQL marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Themes Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Themes</h2>
              <Link to="/themes">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <ThemeGrid themes={featuredThemes} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-violet-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-4">
              <Sparkles size={48} className="mx-auto text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Website?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of developers who are building and sharing beautiful websites with ContentQL.
            </p>
            <Link to="/register">
              <Button size="lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;