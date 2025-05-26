import React from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { updateCinema } from '@/api/Cinema';
import { toast } from 'react-toastify';
import InputField from '@/components/ui/InputField';

// Validation
import { yupResolver } from '@hookform/resolvers/yup';
import { cinemaSchema } from '@/validation/validationSchema';

const EditCinema = ({ cinema, onClose, onUpdate }) => {
  const { token } = useStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: cinema.name,
      location: cinema.location,
    },
    resolver: yupResolver(cinemaSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateCinema(token, cinema.id, data);
      // console.log(res);
      toast.success(res.data.message);
      onUpdate();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 ">
        <h2 className="text-2xl font-bold mb-4">Edit Cinema</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCinema;
