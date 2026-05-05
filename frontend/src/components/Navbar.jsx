import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-blue-grey-900 shadow-sm border-b border-blue-grey-100 dark:border-blue-grey-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">SG</span>
            </div>
            <span className="font-bold text-xl text-primary dark:text-white">Smart Gov Portal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary dark:text-blue-grey-200 hover:text-primary-light transition font-medium">Home</Link>
            
            {user ? (
              <>
                <Link to="/schemes" className="text-primary dark:text-blue-grey-200 hover:text-primary-light transition font-medium">Schemes</Link>
                <Link to="/eligibility-checker" className="text-primary dark:text-blue-grey-200 hover:text-primary-light transition font-medium">Eligibility</Link>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} 
                      className="text-primary dark:text-blue-grey-200 hover:text-primary-light transition font-medium">Dashboard</Link>
                <Link to="/user/profile" className="text-primary dark:text-blue-grey-200 hover:text-primary-light transition font-medium">Profile</Link>
                <NotificationBell />
                <button onClick={handleLogout} className="btn-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-primary dark:text-blue-grey-200 hover:text-primary-light transition font-medium">Login</Link>
                <Link to="/register" className="btn-primary">Register</Link>
              </>
            )}
            
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-blue-grey-50 dark:hover:bg-blue-grey-800 text-primary dark:text-blue-grey-200 transition">
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary dark:text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-blue-grey-100 dark:border-blue-grey-700 pt-4">
            <Link to="/" className="block py-2 text-primary dark:text-blue-grey-200 hover:text-primary-light font-medium">Home</Link>
            {user ? (
              <>
                <Link to="/schemes" className="block py-2 text-primary dark:text-blue-grey-200 hover:text-primary-light font-medium">Schemes</Link>
                <Link to="/eligibility-checker" className="block py-2 text-primary dark:text-blue-grey-200 hover:text-primary-light font-medium">Eligibility</Link>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} 
                      className="block py-2 text-primary dark:text-blue-grey-200 hover:text-primary-light font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="btn-primary w-full mt-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-primary dark:text-blue-grey-200 hover:text-primary-light font-medium">Login</Link>
                <Link to="/register" className="btn-primary w-full mt-2">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
