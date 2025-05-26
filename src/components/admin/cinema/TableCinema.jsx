import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import EditCinema from './EditCinema';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteCinema } from '@/api/Cinema';
import ActionButtons from '@/components/ui/ActionButtons';

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

  const openDeleteModal = (cinemaId) => {
    setCinemaIdToDelete(cinemaId);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Cinema List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 ">
              <th className="border border-gray-300 px-4 py-2 w-16">ID</th>
              <th className="border border-gray-300 px-4 py-2 ">Cinema</th>
              <th className="border border-gray-300 px-4 py-2 ">Location</th>
              <th className="border border-gray-300 px-4 py-2 w-48 ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cinemaList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
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
