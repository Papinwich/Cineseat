import React, { useState, useEffect } from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { updateMovie } from '@/api/Movie';
import InputField from '@/components/ui/InputField';
import { toast } from 'react-toastify';

const EditMovie = ({ movie, onClose, onUpdate }) => {
  const { token } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(movie.image?.url || null);

  // Format date for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString.substring(0, 10);
  };

  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      title: movie.title,
      description: movie.description,
      release_date: formatDateForInput(movie.release_date),
      language: movie.language,
      rate: movie.rate,
      duration: movie.duration,
    },
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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

      // Only append image if a new one is selected
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }
      const res = await updateMovie(token, movie.id, formData);
      toast.success(res.data.message);
      onUpdate(); // Call the update function from props
      onClose(); // Close the modal
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update movie');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 ">Edit Movie</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Preview Column - Left Side */}
          <div className="w-1/3">
            {imagePreview && (
              <div className="mb-4">
                <p className="font-bold mb-2">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Form Column - Right Side */}
          <div className="w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <InputField
                label="Title"
                type="text"
                name="title"
                register={register}
                disabled={isLoading}
              />

              {/* <label className="font-bold">Title</label>
              <input
                type="text"
                className="border p-2 mb-3 rounded"
                {...register('title')}
                disabled={isLoading}
              /> */}

              <InputField
                label="Description"
                elementType="textarea"
                name="description"
                register={register}
                disabled={isLoading}
              />

              {/* <label className="font-bold">Description</label>
              <textarea
                className="border p-2 mb-3 rounded h-20"
                {...register('description')}
                disabled={isLoading}
              /> */}

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

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold">Release date</label>
                  <input
                    type="date"
                    className="border p-2 mb-3 rounded w-full"
                    {...register('release_date')}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="font-bold">Language</label>
                  <input
                    type="text"
                    className="border p-2 mb-3 rounded w-full"
                    {...register('language')}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="font-bold">Rate</label>
                  <input
                    type="text"
                    className="border p-2 mb-3 rounded w-full"
                    {...register('rate')}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="font-bold">Duration (minutes)</label>
                  <input
                    type="number"
                    className="border p-2 mb-3 rounded w-full"
                    {...register('duration')}
                    disabled={isLoading}
                  />
                </div>
              </div> */}

              <label className="font-bold mt-4">Image</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:p-2 file:rounded-md file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                {...register('image')}
                disabled={isLoading}
              />

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md text-white transition cursor-pointer ${
                    isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Movie'}
                </button>
              </div>
              {isLoading && (
                <p className="mt-2 text-gray-500">Updating, please wait...</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;

//  <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
//       <div className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl max-h-screen overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4 ">Edit Movie</h2>

//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Image Preview Column - Left Side */}
//           <div className="md:w-1/3">
//             {imagePreview && (
//               <div className="mb-4">
//                 <p className="font-bold mb-2">Image Preview:</p>
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full h-auto rounded-md object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Form Column - Right Side */}
//           <div className="md:w-2/3">
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
//               <label className="font-bold">Title</label>
//               <input
//                 type="text"
//                 className="border p-2 mb-3 rounded"
//                 {...register('title')}
//                 disabled={isLoading}
//               />

//               <label className="font-bold">Description</label>
//               <textarea
//                 className="border p-2 mb-3 rounded h-20"
//                 {...register('description')}
//                 disabled={isLoading}
//               />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="font-bold">Release date</label>
//                   <input
//                     type="date"
//                     className="border p-2 mb-3 rounded w-full"
//                     {...register('release_date')}
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div>
//                   <label className="font-bold">Language</label>
//                   <input
//                     type="text"
//                     className="border p-2 mb-3 rounded w-full"
//                     {...register('language')}
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div>
//                   <label className="font-bold">Rate</label>
//                   <input
//                     type="text"
//                     className="border p-2 mb-3 rounded w-full"
//                     {...register('rate')}
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div>
//                   <label className="font-bold">Duration (minutes)</label>
//                   <input
//                     type="number"
//                     className="border p-2 mb-3 rounded w-full"
//                     {...register('duration')}
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <label className="font-bold">Upload New Image (Optional)</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="block w-full text-sm text-gray-500 mb-4
//                   file:mr-4 file:py-2 file:px-4
//                   file:rounded-md file:border-0
//                   file:text-sm file:font-semibold
//                   file:bg-blue-50 file:text-blue-700
//                   hover:file:bg-blue-100
//                   disabled:opacity-50"
//                 {...register('image')}
//                 disabled={isLoading}
//               />

//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500 transition"
//                   disabled={isLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-4 py-2 rounded-md text-white transition cursor-pointer ${
//                     isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
//                   }`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Updating...' : 'Update Movie'}
//                 </button>
//               </div>
//               {isLoading && (
//                 <p className="mt-2 text-gray-500">Updating, please wait...</p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
