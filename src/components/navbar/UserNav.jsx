import React, { useState, useRef, useEffect } from 'react';
import MenuItem from '../ui/MenuItem';
import useStore from '@/store/Store';
import { ChevronDown, Ticket, ShieldUser, LogOut, Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserNav = () => {
  // return <div>register login ticket</div>;
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const authItems = [
    { name: 'Register', path: '/register' },
    { name: 'Login', path: '/login' },
  ];
  // const logInItem = [{ name: 'Ticket', path: '/mytickets' }];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex gap-5 text-lg font-semibold ">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Logged in  */}
          <div>
            <button
              className="flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {/* User name */}
              <div className="text-primary">Hi,{user.username}</div>
              {/* Dropdown button */}
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 bg-gray-700 text-white rounded-sm ${
                  isDropdownOpen ? 'transform rotate-180 bg-primary' : ''
                }`}
              />
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-ful w-38 bg-gray-50 rounded-md shadow-lg py-2 z-30  border-2 border-primary">
              <div className="flex flex-col items-center justify-center">
                {/* {logInItem.map((item) => (
                  <MenuItem key={item.path} name={item.name} path={item.path} />
                ))} */}
                <Link
                  to={'/booking'}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-200 cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  <Book size={16} className="mr-2" />
                  Bookings
                </Link>
                <Link
                  to={'/mytickets'}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-200 cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  <Ticket size={16} className="mr-2" />
                  Tickets
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to={'/admin'}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-200 cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <ShieldUser size={16} className="mr-2" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600  hover:bg-gray-200 cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Not Logged in (show Register , Login) */}
          {authItems.map((item) => (
            <MenuItem key={item.path} name={item.name} path={item.path} />
          ))}
        </>
      )}
    </nav>
  );
};

export default UserNav;
