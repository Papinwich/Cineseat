import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink to={'/'}>
      <div className="flex items-center justify-center p-2 bg-gradient-to-r from-[#0C0F0C] to-[#344E41] rounded-md">
        <img
          className="object-cover h-full flex-shrink-0 w-[160px]"
          src="https://res.cloudinary.com/dnl2ixhcx/image/upload/v1747987288/CINESEATlogoWhite_qtrwlr.svg"
          alt="Logo"
        />
      </div>
    </NavLink>
  );
};

export default Logo;
