import React from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { updateScreen } from '@/api/Screen';
import { toast } from 'react-toastify';
import InputField from '@/components/ui/InputField';

const EditScreen = ({ screen, onClose, onUpdate }) => {
  const { token, cinemaList } = useStore();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      cinemaId: screen.cinema.id,
      name: screen.name,
      type: screen.type,
      capacity: screen.capacity,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await updateScreen(token, screen.id, data);
      toast.success(res.data.message);
      onUpdate();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 ">
        <h2 className="text-2xl font-bold mb-4">Edit Screen</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <InputField
            label="Cinema"
            elementType="select"
            name="cinemaId"
            register={register}
            options={cinemaList.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            disabled={true}
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

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
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

export default EditScreen;

{
  /* <label className="font-bold">Cinema</label>
          <select
            disabled
            className="border text-zinc-400"
            {...register('cinemaId')}
          >
            {cinemaList.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label className="font-bold">Screen Name</label>
          <input type="text" className="border" {...register('name')} />

          <label className="font-bold">Screen Type</label>
          <select className="border" {...register('type')}>
            <option value="Standard">Standard</option>
            <option value="IMAX">IMAX</option>
            <option value="3D">3D</option>
            <option value="4DX">4DX</option>
          </select>

          <label className="font-bold">Capacity</label>
          <select className="border" {...register('capacity')}>
            <option value="sm">Small (60 seats)</option>
            <option value="md">Medium (90 seats)</option>
            <option value="lg">Large (120 seats)</option>
          </select> */
}
