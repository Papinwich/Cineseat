import useStore from '@/store/Store';
import React, { useState, useRef, useEffect } from 'react';
import { ShieldUser, ChevronDown, LogOut, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleToHome = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 sticky top-0 z-10">
      <div>
        <button
          className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          onClick={handleToHome}
        >
          <House size={16} className="mr-2" />
          Go to Home page
        </button>
      </div>
      <div className="flex items-center gap-3 relative">
        {/* ICON */}
        <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 shadow-sm">
          <ShieldUser size={20} />
        </div>
        {/* ADMIN */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Admin: {user.username}
          </span>
        </div>
        {/* Dropdown button */}
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              isDropdownOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
