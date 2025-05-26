import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useStore from '@/store/Store';
import { useNavigate } from 'react-router-dom';
import BtnSecond from '../ui/BtnSecond';
import BtnPrime from '../ui/BtnPrime';
import InputField from '../ui/InputField';

const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const inputFields = [
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Password', name: 'password', type: 'password' },
  ];

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate(-1);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      const role = res.data.payload.role;
      toast.success(res.data.message);
      roleRedirect(role);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };
  const handleToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-primary">Log in</h2>
        <p className="mt-2 text-sm ">Log in to your account</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            register={register}
            name={field.name}
          />
        ))}

        <div className="space-y-3">
          <BtnPrime ButtonText="Login" type="submit" />
          <div className="flex justify-center items-center">
            <span className="text-sm ">Don't have an account?</span>
            <BtnSecond
              ButtonText="Register"
              onClick={() => {
                handleToRegister();
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
