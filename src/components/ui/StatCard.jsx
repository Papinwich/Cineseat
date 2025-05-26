import React from 'react';

const StatCard = ({ title, value, Icon }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-sm p-4 w-60 ">
      <div className="flex-1">
        <h3 className="text-md text-gray-600">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="flex items-center justify-center text-gray-700">
        {Icon && <Icon />}
      </div>
    </div>
  );
};

export default StatCard;
