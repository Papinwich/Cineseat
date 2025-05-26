import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import EditMovie from './EditMovie';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteMovie, updateMovieStatus } from '@/api/Movie';
import dayjs from 'dayjs';
import ActionButtons from '@/components/ui/ActionButtons';
import ViewDetailMovie from './ViewDetailMovie';

const TableMovie = () => {
  const { movieList, fetchMovies, token } = useStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieForView, setSelectedMovieForView] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = async () => {
    if (!movieIdToDelete) return;

    try {
      const res = await deleteMovie(token, movieIdToDelete);
      toast.success(res.data.message);
      fetchMovies();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };

  const openDeleteModal = (movieId) => {
    setMovieIdToDelete(movieId);
    setShowModal(true);
  };

  const handleUpdateStatus = async (item, e) => {
    try {
      const newStatus = e.target.value;
      await updateMovieStatus(token, item.id, { updatedStatus: newStatus });
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewDetail = (movie) => {
    setSelectedMovieForView(movie);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 truncate">
              <th className="border border-gray-300 px-4 py-2 w-16">ID</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>

              <th className="border border-gray-300 px-4 py-2 ">
                Release Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Language</th>
              {/* <th className="border border-gray-300 px-4 py-2">Rate</th> */}
              <th className="border border-gray-300 px-4 py-2">Duration</th>
              <th className="border border-gray-300 px-4 py-2 ">
                Choose Status
              </th>
              <th className="border border-gray-300 px-4 py-2 w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movieList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 truncate">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.image && (
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.title}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {/* {item.release_date} */}
                  {dayjs(item.release_date).format('D MMM YYYY').toUpperCase()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.language}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  {item.rate}
                </td> */}
                <td className="border border-gray-300 px-4 py-2">
                  {item.duration}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item, e)}
                    className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md   "
                  >
                    <option value="NOT_AVAILABLE">Not Available</option>
                    <option value="NOW_SHOWING">Showing</option>
                    <option value="COMING_SOON">Coming Soon</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <ActionButtons
                    item={item}
                    setSelectedItem={setSelectedMovie}
                    openDeleteModal={openDeleteModal}
                    viewDetail={handleViewDetail}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMovie && (
        <EditMovie
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onUpdate={fetchMovies}
        />
      )}
      {selectedMovieForView && (
        <ViewDetailMovie
          movie={selectedMovieForView}
          onClose={() => setSelectedMovieForView(null)}
        />
      )}

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this Movie?"
      />
    </div>
  );
};

export default TableMovie;

{
  /* <button
                    onClick={() => setSelectedMovie(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button> */
}
