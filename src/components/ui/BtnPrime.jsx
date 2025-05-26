import React from 'react';

const BtnPrime = ({ ButtonText, type = 'button', onClick, isLoading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 rounded-md text-creme ${
        isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-primary/70'
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Uploading...' : ButtonText}
    </button>
  );
};

export default BtnPrime;
