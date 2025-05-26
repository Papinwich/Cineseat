import React, { useEffect } from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { createScreen } from '@/api/Screen';
import InputField from '@/components/ui/InputField';
import BtnPrime from '@/components/ui/BtnPrime';
import { toast } from 'react-toastify';

const FormScreen = () => {
  const { token, fetchCinemas, cinemaList, fetchScreens } = useStore();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    fetchCinemas();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await createScreen(token, data);
      toast.success(res.data.message);
      fetchScreens();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
      <h2 className="text-2xl font-bold mb-4">New Screen</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Cinema"
          elementType="select"
          name="cinemaId"
          register={register}
          selectPlaceholder="Please select a cinema"
          options={cinemaList.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />

        <InputField
          label="Screen Name"
          type="text"
          name="name"
          register={register}
          placeholder="Enter Screen Name"
        />

        <InputField
          label="Screen Type"
          elementType="select"
          name="type"
          register={register}
          options={[
            { value: 'Standard', label: 'Standard' },
            { value: 'IMAX', label: 'IMAX' },
            { value: '3D', label: '3D' },
            { value: '4DX', label: '4DX' },
          ]}
        />

        <InputField
          label="Capacity"
          elementType="select"
          name="capacity"
          register={register}
          options={[
            { value: 'sm', label: 'Small (60 seats)' },
            { value: 'md', label: 'Medium (90 seats)' },
            { value: 'lg', label: 'Large (120 seats)' },
          ]}
        />

        <BtnPrime ButtonText="Add Screen" type="submit" />
      </form>
    </div>
  );
};

export default FormScreen;

{
  /* <label className="font-bold">Cinema</label>
        <select className="border" {...register('cinemaId')}>
          {cinemaList.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select> */
}
{
  /* <label className="font-bold">Screen Name</label>
        <input type="text" className="border" {...register('name')} /> */
}
{
  /* <label className="font-bold">Screen Type</label>
        <select className="border" {...register('type')}>
          <option value="Standard">Standard</option>
          <option value="IMAX">IMAX</option>
          <option value="3D">3D</option>
          <option value="4DX">4DX</option>
        </select> */
}
{
  /* <label className="font-bold">Capacity</label>
        <select className="border" {...register('capacity')}>
          <option value="sm">Small (60 seats)</option>
          <option value="md">Medium (90 seats)</option>
          <option value="lg">Large (120 seats)</option>
        </select> */
}
{
  /* <button
          type="submit"
          className="w-36 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Add Screen
        </button> */
}
