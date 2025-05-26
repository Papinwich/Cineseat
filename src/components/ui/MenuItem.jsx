import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ name, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        ` cursor-pointer text-lg font-bold  ${
          isActive
            ? 'text-primary  border-b-2 border-primary'
            : 'text-gray-600 hover:text-primary'
        }`
      }
    >
      {name}
    </NavLink>
  );
};

export default MenuItem;
