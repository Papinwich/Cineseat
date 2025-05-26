import React from 'react';
import MenuItem from '../ui/MenuItem';

const Menu = () => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Movie', path: '/movies' },
    { name: 'Cinema', path: '/cinemas' },
  ];

  return (
    <nav className="flex gap-5 ">
      {menuItems.map((item) => (
        <MenuItem key={item.path} name={item.name} path={item.path} />
      ))}
    </nav>
  );
};

export default Menu;
