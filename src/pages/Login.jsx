import Logo from '@/components/authForm/Logo';
import LoginForm from '@/components/authForm/LoginForm';
import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-r from-[#0C0F0C] to-[#344E41]">
      {/* Left  */}
      <div className="hidden sm:flex sm:w-1/2 bg-creme flex-col items-center justify-center p-8">
        <Logo />
        <h1 className="text-primary text-3xl font-bold mt-6">Welcome Back</h1>
      </div>

      {/* Right */}
      <div className="flex sm:w-1/2 items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
