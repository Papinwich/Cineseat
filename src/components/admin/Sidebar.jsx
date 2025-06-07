import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Popcorn,
  Projector,
  Clapperboard,
  User,
  Table,
  Settings,
  Book,
} from 'lucide-react';

// Navigation items configuration
const navItems = [
  { path: '/admin/cinema', label: 'Cinema', Icon: Popcorn },
  { path: '/admin/screen', label: 'Screen', Icon: Projector },
  { path: '/admin/movie', label: 'Movie', Icon: Clapperboard },
  { path: '/admin/showtime', label: 'Showtime', Icon: Table },
  { path: '/admin/user', label: 'User Manage', Icon: User },
  { path: '/admin/booking', label: 'Booking', Icon: Book },
];

// Reusable NavLink className logic
const getNavLinkClass = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
    isActive ? 'bg-creme text-primary' : 'hover:bg-creme/10'
  } lg:gap-2 lg:px-4`;

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-primary text-slate-100 w-16 lg:min-w-56">
      {/* Header */}
      <NavLink to="/admin">
        <div className="hidden lg:flex h-16 items-center justify-center p-2 bg-creme">
          <img
            className="object-cover h-10 flex-shrink-0 "
            src="https://res.cloudinary.com/dnl2ixhcx/image/upload/v1747823168/1_dwxj5f.svg"
            alt="Logo"
          />
        </div>
        <div className="lg:hidden flex h-16 items-center justify-center p-2 bg-creme">
          <img
            className="object-cover h-10 flex-shrink-0 "
            src="https://res.cloudinary.com/dnl2ixhcx/image/upload/v1747823168/3_egrp2b.svg"
            alt="Logo"
          />
        </div>
      </NavLink>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 px-2 py-4 lg:px-4">
        {navItems.map(({ path, label, Icon }) => (
          <NavLink key={path} to={path} className={getNavLinkClass}>
            <Icon className="h-5 w-5" />
            <span className="hidden lg:block">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="bg-primary p-4 text-center text-sm">
        <span className="hidden lg:block">© 2025 Admin Panel</span>
        <span className="block lg:hidden">© 2025</span>
      </div>
    </div>
  );
};

export default Sidebar;
