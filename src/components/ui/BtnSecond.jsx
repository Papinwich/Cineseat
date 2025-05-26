import React from 'react';

const BtnSecond = ({ ButtonText, type = 'button', onClick }) => {
  return (
    <button
      type={type}
      className="w-full bg-creme border border-primary text-primary hover:bg-creme/70 active:bg-primary active:text-creme py-2 rounded-md"
      onClick={onClick}
    >
      {ButtonText}
    </button>
  );
};

export default BtnSecond;
