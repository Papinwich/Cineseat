import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoadingRedirect = ({ to = '/', delay = 3 }) => {
  const [count, setCount] = useState(delay);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setRedirect(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [delay]);

  if (redirect) {
    return <Navigate to={to} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      {/* Loader Animation */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

      {/* Countdown Text */}
      <p className="mt-4 text-lg font-semibold">
        Redirecting in <span className="text-blue-500">{count}</span> seconds...
      </p>
    </div>
  );
};

export default LoadingRedirect;
