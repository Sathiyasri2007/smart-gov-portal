import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiPlus, 
  FiX, 
  FiFileText, 
  FiCheckCircle, 
  FiBookmark,
  FiHome,
  FiLogIn
} from 'react-icons/fi';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = user ? [
    { icon: FiHome, label: 'Dashboard', path: user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard', color: 'bg-primary' },
    { icon: FiFileText, label: 'Browse Schemes', path: '/schemes', color: 'bg-primary-light' },
    { icon: FiCheckCircle, label: 'Check Eligibility', path: '/eligibility-checker', color: 'bg-secondary' },
    { icon: FiBookmark, label: 'Bookmarks', path: '/user/bookmarks', color: 'bg-secondary-dark' },
  ] : [
    { icon: FiLogIn, label: 'Login', path: '/login', color: 'bg-primary' },
    { icon: FiHome, label: 'Home', path: '/', color: 'bg-secondary' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <div className={`absolute bottom-16 right-0 flex flex-col-reverse gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => handleNavigation(item.path)}
          >
            <span className="bg-white dark:bg-blue-grey-800 text-primary dark:text-white px-3 py-2 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
            <button className={`${item.color} text-white p-3 rounded-lg shadow-md hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB Button */}
      <button
        onClick={toggleMenu}
        className={`gradient-bg text-white p-4 rounded-lg shadow-lg hover:scale-110 transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
      >
        {isOpen ? <FiX size={24} /> : <FiPlus size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;
