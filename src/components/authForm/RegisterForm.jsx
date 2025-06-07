import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { OnRegister } from '@/api/auth';
import { toast } from 'react-toastify';
import InputField from '../ui/InputField';
import BtnPrime from '../ui/BtnPrime';
import { useNavigate } from 'react-router-dom';

// Validation
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/validation/validationSchema';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();

  const inputFields = [
    { label: 'Username', name: 'username', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
  ];

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error('Password not match');
    }
    try {
      const res = await OnRegister(data);
      toast.success(res.data.message);
      reset();
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-primary">Register</h2>
        <p className="mt-2 text-sm ">Create new account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            register={register}
            name={field.name}
            error={errors[field.name]}
          />
        ))}

        <BtnPrime ButtonText="Register" type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
