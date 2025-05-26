import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import UserNav from './UserNav';

const MainNav = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-creme border-b border-primary">
      <div className="flex flex-col h-40 items-center py-4 justify-between   md:flex-row md:justify-between md:px-10 md:max-h-20">
        {/* Left */}
        <Logo />
        {/* Middle */}
        <Menu />
        {/* Right */}
        <UserNav />
      </div>
    </nav>
  );
};

export default MainNav;
