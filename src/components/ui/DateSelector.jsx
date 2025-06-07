import React from 'react';

const DateSelector = ({ name, onActive, isActive }) => {
  return (
    <div
      onClick={onActive}
      className={`p-4 w-24 h-16 bg-gray-100 border border-primary rounded-lg shadow-md cursor-pointer text-center flex flex-col justify-center items-center whitespace-normal break-words ${
        isActive ? 'bg-primary text-creme' : 'text-primary hover:bg-primary/10'
      }`}
    >
      {name}
    </div>
  );
};

export default DateSelector;
