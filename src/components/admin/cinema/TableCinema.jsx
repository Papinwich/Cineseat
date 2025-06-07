import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import EditCinema from './EditCinema';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteCinema } from '@/api/Cinema';
import ActionButtons from '@/components/ui/ActionButtons';
import TablePagination from '@/components/ui/TablePagination';

const TableCinema = () => {
  const { cinemaList, fetchCinemas, token } = useStore();
  const [selectedCinema, setSelectedCinema] = useState(null);
  // console.log(selectedCinema);

  const [showModal, setShowModal] = useState(false);
  const [CinemaIdToDelete, setCinemaIdToDelete] = useState(null);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const handleDelete = async () => {
    if (!CinemaIdToDelete) return;

    try {
      const res = await deleteCinema(token, CinemaIdToDelete);
      toast.success(res.data.message);
      fetchCinemas();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  // const sorted = [...cinemaList].sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );
  // console.log('sorted', sorted);

  const openDeleteModal = (cinemaId) => {
    setCinemaIdToDelete(cinemaId);
    setShowModal(true);
  };

  //----- Pagination -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(cinemaList.length / itemsPerPage);
  const currentData = cinemaList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //---------------------//

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Cinema List</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300 text-xs  text-gray-600 truncate">
            <tr>
              <th className="py-4 px-2 text-center w-16">ID</th>
              <th className="py-4 px-2">Cinema</th>
              <th className="py-4 px-2">Location</th>
              <th className="py-4 px-2 w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 truncate">
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.location}</td>
                <td className="p-2">
                  <ActionButtons
                    item={item}
                    setSelectedItem={setSelectedCinema}
                    openDeleteModal={openDeleteModal}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-2">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {/* Edite Screen */}
      {selectedCinema && (
        <EditCinema
          cinema={selectedCinema}
          onClose={() => setSelectedCinema(null)}
          onUpdate={fetchCinemas}
        />
      )}
      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this Cinema?"
      />
    </div>
  );
};

export default TableCinema;
