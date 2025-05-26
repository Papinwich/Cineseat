import React, { useState, useEffect } from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { createMovie } from '@/api/Movie';
import InputField from '@/components/ui/InputField';
import BtnPrime from '@/components/ui/BtnPrime';
import { toast } from 'react-toastify';

const FormMovie = () => {
  const { token, fetchMovies } = useStore();
  const { register, handleSubmit, reset, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('release_date', data.release_date);
      formData.append('language', data.language);
      formData.append('rate', data.rate);
      formData.append('duration', data.duration);
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }
      console.log(formData);
      const res = await createMovie(token, formData);
      toast.success(res.data.message);
      reset();
      setImagePreview(null);
      fetchMovies();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">New Movie</h2>
      <div className="flex flex-row gap-6">
        {/* Image Preview Column - Left Side */}
        <div className="w-1/3">
          <p className="font-bold mb-2">Image Preview:</p>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-md object-cover"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">No Image Uploaded</span>
            </div>
          )}
        </div>
        {/* Form Column - Right Side */}
        <div className="w-2/3">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Title"
              type="text"
              name="title"
              register={register}
              disabled={isLoading}
            />

            <InputField
              label="Description"
              elementType="textarea"
              name="description"
              register={register}
              disabled={isLoading}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Release date"
                type="date"
                name="release_date"
                register={register}
                disabled={isLoading}
              />

              <InputField
                label="Language"
                type="text"
                name="language"
                register={register}
                disabled={isLoading}
              />

              <InputField
                label="Rate"
                type="text"
                name="rate"
                register={register}
                disabled={isLoading}
              />

              <InputField
                label="Duration"
                type="number"
                name="duration"
                register={register}
                disabled={isLoading}
              />
            </div>

            <label className="font-bold mt-4">Image</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:p-2 file:rounded-md file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              {...register('image')}
              disabled={isLoading}
            />

            <div className="mt-4">
              <BtnPrime
                ButtonText="Add Movie"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>

      {isLoading && (
        <p className="mt-2 text-gray-500">Uploading, please wait...</p>
      )}
    </div>
  );
};

export default FormMovie;

{
  /* <label className="font-bold">Title</label>
        <input
          type="text"
          className="border"
          {...register('title')}
          disabled={isLoading}
        />

        <label className="font-bold">Description</label>
        <input
          type="text"
          className="border"
          {...register('description')}
          disabled={isLoading}
        />

        <label className="font-bold">Release date</label>
        <input
          type="date"
          className="border"
          {...register('release_date')}
          disabled={isLoading}
        />

        <label className="font-bold">Language</label>
        <input
          type="text"
          className="border"
          {...register('language')}
          disabled={isLoading}
        />

        <label className="font-bold">Rate</label>
        <input
          type="text"
          className="border"
          {...register('rate')}
          disabled={isLoading}
        />

        <label className="font-bold">Duration</label>
        <input
          type="number"
          className="border"
          {...register('duration')}
          disabled={isLoading}
        /> */
}
{
  /* <button
              type="submit"
              className={`mt-2 w-36 py-2 rounded-md text-white cursor-pointer ${
                isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Add Movie'}
            </button> */
}
