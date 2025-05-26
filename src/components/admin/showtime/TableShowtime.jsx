import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import EditShowtime from './EditShowtime';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteShowtime } from '@/api/Showtime';
import dayjs from 'dayjs';
import ActionButtons from '@/components/ui/ActionButtons';

const TableShowtime = () => {
  const {
    token,
    showtimeList,
    fetchShowtimes,
    cinemaList,
    screenList,
    fetchScreens,
  } = useStore();
  const { register, watch, setValue } = useForm({
    defaultValues: {
      cinemaId: '',
      screenId: '',
    },
  });

  // Watch form values
  const selectedCinemaId = watch('cinemaId');
  const selectedScreenId = watch('screenId');

  // Fetch showtimes and screens when component mounts
  useEffect(() => {
    fetchScreens();
    fetchShowtimes();
  }, [fetchScreens, fetchShowtimes]); // เพิ่ม dependency

  // Filter screens based on selected cinema
  const filteredScreens = selectedCinemaId
    ? screenList.filter(
        (screen) => screen.cinemaId === parseInt(selectedCinemaId)
      )
    : [];

  // Filter showtimes based on selected screen or cinema
  const filteredShowtimes = (() => {
    if (selectedScreenId) {
      return showtimeList.filter(
        (showtime) => showtime.screenId === parseInt(selectedScreenId)
      );
    } else if (selectedCinemaId) {
      const screensInCinema = screenList
        .filter((screen) => screen.cinemaId === parseInt(selectedCinemaId))
        .map((screen) => screen.id);
      return showtimeList.filter((showtime) =>
        screensInCinema.includes(showtime.screenId)
      );
    }
    return showtimeList;
  })();

  // Reset screenId when cinemaId changes
  useEffect(() => {
    if (selectedCinemaId) {
      setValue('screenId', ''); // Reset screen selection when cinema changes
    }
  }, [selectedCinemaId, setValue]);

  const formatDateTime = (datetime) => {
    return dayjs(datetime).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm ');
  };

  // edit
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // delete
  const [showModal, setShowModal] = useState(false);
  const [showtimeIdToDelete, setShowtimeIdToDelete] = useState(null);

  const handleDelete = async () => {
    console.log(showtimeIdToDelete);
    if (!showtimeIdToDelete) return;

    try {
      const res = await deleteShowtime(token, showtimeIdToDelete);
      toast.success(res.data.message);
      fetchShowtimes();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };

  const openDeleteModal = (showtimeId) => {
    setShowtimeIdToDelete(showtimeId);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Showtime List</h2>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <div>
          <label className="font-bold mr-2">Cinema:</label>
          <select className="border p-2 rounded" {...register('cinemaId')}>
            <option value="">All Cinemas</option>
            {cinemaList.length === 0 ? (
              <option value="" disabled>
                Loading cinemas...
              </option>
            ) : (
              cinemaList.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label className="font-bold mr-2">Screen:</label>
          <select
            className="border p-2 rounded"
            {...register('screenId')}
            disabled={!selectedCinemaId || screenList.length === 0}
          >
            <option value="">All Screens</option>
            {filteredScreens.length === 0 && selectedCinemaId ? (
              <option value="" disabled>
                No screens available
              </option>
            ) : (
              filteredScreens.map((screen) => (
                <option key={screen.id} value={screen.id}>
                  {screen.name} ({screen.type})
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 truncate">
              <th className="border border-gray-300 px-4 py-2 w-16">ID</th>
              <th className="border border-gray-300 px-4 py-2">Cinema</th>
              <th className="border border-gray-300 px-4 py-2">Screen</th>
              <th className="border border-gray-300 px-4 py-2">Movie</th>
              <th className="border border-gray-300 px-4 py-2">Date & Time</th>
              <th className="border border-gray-300 px-4 py-2 w-48">Action</th>
            </tr>
          </thead>
          <tbody>
            {showtimeList.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading showtimes...
                </td>
              </tr>
            ) : filteredShowtimes.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No showtimes available
                </td>
              </tr>
            ) : (
              filteredShowtimes.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 truncate">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.screen.cinema.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.screen.name} ({item.screen.type})
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.Movie.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* {formatDateTime(item.datetime)} */}
                    {dayjs(item.datetime)
                      .format('D MMM YYYY HH:mm')
                      .toUpperCase()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {/* <button
                      onClick={() => setSelectedShowtime(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button> */}
                    <ActionButtons
                      item={item}
                      setSelectedItem={setSelectedShowtime}
                      openDeleteModal={openDeleteModal}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Edite Showtime */}
      {selectedShowtime && (
        <EditShowtime
          showtime={selectedShowtime}
          onClose={() => setSelectedShowtime(null)}
          onUpdate={fetchShowtimes}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this showtime?"
      />
    </div>
  );
};

export default TableShowtime;
