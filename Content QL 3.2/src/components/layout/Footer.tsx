import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Palette className="h-8 w-8 text-pink-500 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                ContentQL
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Empowering developers to create, customize, and share dynamic website themes effortlessly.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/themes" className="text-gray-400 hover:text-white text-sm">
                  Themes
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-400 hover:text-white text-sm">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-400 hover:text-white text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white text-sm">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} ContentQL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;