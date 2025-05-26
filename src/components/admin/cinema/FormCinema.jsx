import React from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { createCinema } from '@/api/cinema';
import InputField from '@/components/ui/InputField';
import BtnPrime from '@/components/ui/BtnPrime';
import { toast } from 'react-toastify';

// Validation
import { yupResolver } from '@hookform/resolvers/yup';
import { cinemaSchema } from '@/validation/validationSchema';

const FormCinema = () => {
  const { token, fetchCinemas } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(cinemaSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await createCinema(token, data);
      toast.success(res.data.message);
      reset();
      fetchCinemas();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 ">
      <h2 className="text-2xl font-bold mb-4">New Cinema</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Name"
          type="text"
          register={register}
          name="name"
          placeholder="Enter Cinema Name"
          error={errors.name}
        />

        <InputField
          label="Location"
          type="text"
          register={register}
          name="location"
          placeholder="Enter Location"
          error={errors.location}
        />

        <BtnPrime ButtonText="Add Cinema" type="submit" />
      </form>
    </div>
  );
};

export default FormCinema;

{
  /* <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter Cinema Name"
              type="text"
              {...register('name')}
            />
          </div> */
}

{
  /* <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter Location"
              type="text"
              {...register('location')}
            />
          </div> */
}

{
  /* <button
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            type="submit"
          >
            Add Cinema
          </button> */
}
