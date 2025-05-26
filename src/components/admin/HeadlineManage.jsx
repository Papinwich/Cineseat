import React from 'react';

const HeadlineManage = ({ text }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-2xl font-bold">
      <h1>{text}</h1>
    </div>
  );
};

export default HeadlineManage;
