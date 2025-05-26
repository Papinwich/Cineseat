import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        theme="colored"
      />
      <AppRoutes />
    </>
  );
};

export default App;
