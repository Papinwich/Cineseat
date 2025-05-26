import Logo from '@/components/authForm/Logo';
import RegisterForm from '@/components/authForm/RegisterForm';
import React from 'react';

function Register() {
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gradient-to-r from-[#0C0F0C] to-[#344E41]">
      {/* Left  */}
      <div className="hidden sm:flex sm:w-1/2 bg-creme flex-col items-center justify-center p-8">
        <Logo />
        <h1 className="text-primary text-3xl font-bold mt-6">Welcome !!</h1>
      </div>

      {/* Right */}
      <div className="flex sm:w-1/2 items-center justify-center p-8">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
