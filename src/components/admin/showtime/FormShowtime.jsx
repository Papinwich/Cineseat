import React, { useEffect } from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { createShowtime } from '@/api/Showtime';
import InputField from '@/components/ui/InputField';
import BtnPrime from '@/components/ui/BtnPrime';
import { toast } from 'react-toastify';

// Validation
import { yupResolver } from '@hookform/resolvers/yup';
import { showtimeSchema } from '@/validation/validationSchema';

const FormShowtime = () => {
  const {
    token,
    fetchCinemas,
    cinemaList,
    screenList,
    fetchMovies,
    movieList,
    fetchShowtimes,
  } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(showtimeSchema),
  });

  useEffect(() => {
    fetchCinemas();
    fetchMovies();
  }, []);

  const watchedCinemaId = watch('cinemaId') || '0';
  const filteredScreenList = screenList.filter(
    (screen) => screen.cinemaId === parseInt(watchedCinemaId)
  );

  // สร้าง options สำหรับเวลา
  const timeOptions = Array.from({ length: 24 }).flatMap((_, hour) =>
    [0, 10, 20, 30, 40, 50].map((minute) => {
      const h = String(hour).padStart(2, '0');
      const m = String(minute).padStart(2, '0');
      const time = `${h}:${m}`;
      return { value: time, label: time };
    })
  );

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      // console.log(data.screenId);
      const res = await createShowtime(token, data);
      fetchShowtimes();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
      <h2 className="text-2xl font-bold mb-4">New Showtime</h2>

      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Select Cinema */}
        <InputField
          label="Cinema"
          elementType="select"
          name="cinemaId"
          register={register}
          selectPlaceholder="Select a cinema"
          options={cinemaList.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          error={errors.cinemaId}
        />

        {/* Select Screen */}
        <InputField
          label="Screen"
          elementType="select"
          name="screenId"
          register={register}
          selectPlaceholder="Select a screen"
          noOptionsMessage="No screen available"
          options={filteredScreenList.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          error={errors.screenId}
        />

        {/* Select Movie */}
        <InputField
          label="Movie"
          elementType="select"
          name="movieId"
          register={register}
          selectPlaceholder="Select a movie"
          options={movieList.map((item) => ({
            value: item.id,
            label: item.title,
          }))}
          error={errors.movieId}
        />

        {/* Select Time */}
        <InputField
          label="Time"
          elementType="select"
          name="time"
          register={register}
          selectPlaceholder="Select time"
          options={timeOptions}
          error={errors.time}
        />

        {/* Select Date */}
        <InputField
          label="Date"
          type="date"
          name="date"
          register={register}
          error={errors.date}
        />

        <BtnPrime ButtonText="Add Showtime" type="submit" />
        {/* <button
          type="submit"
          className="mt-3 w-36 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Add Showtime
        </button> */}
      </form>
    </div>
  );
};

export default FormShowtime;
