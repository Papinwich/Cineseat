import React, { useEffect } from 'react';
import useStore from '@/store/Store';
import { useForm } from 'react-hook-form';
import { updateShowtime } from '@/api/Showtime';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import InputField from '@/components/ui/InputField';

// plugin
dayjs.extend(utc);
dayjs.extend(timezone);

const EditShowtime = ({ showtime, onClose, onUpdate }) => {
  const { token, fetchMovies, movieList } = useStore();

  // format time
  const formatTimeForInput = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).tz('Asia/Bangkok').format('HH:mm');
  };

  // format date
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).tz('Asia/Bangkok').format('YYYY-MM-DD');
  };

  const { handleSubmit, register } = useForm({
    defaultValues: {
      movieId: showtime.Movie.id,
      time: formatTimeForInput(showtime.datetime),
      date: formatDateForInput(showtime.datetime),
    },
  });
  // console.log(showtime);

  // สร้าง options สำหรับเวลา
  const timeOptions = Array.from({ length: 24 }).flatMap((_, hour) =>
    [0, 10, 20, 30, 40, 50].map((minute) => {
      const h = String(hour).padStart(2, '0');
      const m = String(minute).padStart(2, '0');
      const time = `${h}:${m}`;
      return { value: time, label: time };
    })
  );

  useEffect(() => {
    fetchMovies();
  }, []);

  const onSubmit = async (data) => {
    try {
      // console.log('hello', data);
      const res = await updateShowtime(token, showtime.id, data);
      toast.success(res.data.message);
      onUpdate();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Showtime</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* <label className="font-bold">Time</label>
          <input type="time" className="border" {...register('time')} /> */}
          <InputField
            label="Cinema"
            type="text"
            name="cinemaName"
            register={register}
            disabled={true}
            placeholder={showtime.screen?.cinema?.name || ''}
          />

          <InputField
            label="Screen"
            type="text"
            name="screenName"
            register={register}
            disabled={true}
            placeholder={showtime.screen?.name || ''}
          />

          <InputField
            label="Movie"
            elementType="select"
            name="movieId"
            register={register}
            selectPlaceholder="Please select a movie"
            options={movieList.map((item) => ({
              value: item.id,
              label: item.title,
            }))}
          />

          <InputField
            label="Time"
            elementType="select"
            name="time"
            register={register}
            selectPlaceholder="Please select time"
            options={timeOptions}
          />

          <InputField
            label="Date"
            type="date"
            name="date"
            register={register}
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

export default EditShowtime;
