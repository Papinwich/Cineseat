import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import EditMovie from './EditMovie';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteMovie, updateMovieStatus } from '@/api/Movie';
import dayjs from 'dayjs';
import ActionButtons from '@/components/ui/ActionButtons';
import ViewDetailMovie from './ViewDetailMovie';
import TablePagination from '@/components/ui/TablePagination';
import { CirclePlay, OctagonX, CalendarFold } from 'lucide-react';

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

  //----- Pagination -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(movieList.length / itemsPerPage);
  const currentData = movieList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //---------------------//

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300 text-xs  text-gray-600 truncate">
            <tr>
              <th className="py-4 px-2 text-center w-16">ID</th>
              <th className="py-4 px-2 min-w-20">Image</th>
              <th className="py-4 px-2 min-w-80">Title</th>

              <th className="py-4 px-2 min-w-30">Release Date</th>
              <th className="py-4 px-2">Runtime</th>
              <th className="py-4 px-2">Language</th>
              <th className="py-4 px-2 ">Status</th>
              <th className="py-4 px-2 w-40">Choose</th>
              <th className="py-4 px-2 w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 truncate">
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2">
                  {item.image && (
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">
                  {dayjs(item.release_date).format('D MMM YYYY').toUpperCase()}
                </td>
                <td className="p-2">{item.duration}</td>
                <td className="p-2">{item.language}</td>
                <td className="p-2">
                  <span
                    className={`inline-flex items-center gap-1 p-2 text-xs rounded-full ${
                      item.status === 'NOW_SHOWING'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'COMING_SOON'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.status === 'NOW_SHOWING' ? (
                      <CirclePlay size={16} />
                    ) : item.status === 'COMING_SOON' ? (
                      <CalendarFold size={16} />
                    ) : (
                      <OctagonX size={16} />
                    )}
                  </span>
                </td>
                <td className="p-2">
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
                <td className="p-2">
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
      {/* Pagination */}
      <div className="mt-4">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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
