import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import EditScreen from './EditScreen';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteScreen } from '@/api/Screen';
import ActionButtons from '@/components/ui/ActionButtons';
import TablePagination from '@/components/ui/TablePagination';

const TableScreen = () => {
  const { screenList, fetchScreens, token } = useStore();
  const [selectedScreen, setSelectedScreen] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [screenIdToDelete, setScreenIdToDelete] = useState(null);

  useEffect(() => {
    fetchScreens();
  }, [fetchScreens]);

  const handleDelete = async () => {
    if (!screenIdToDelete) return;

    try {
      const res = await deleteScreen(token, screenIdToDelete);
      toast.success(res.data.message);
      fetchScreens();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    }
  };
  const openDeleteModal = (screenId) => {
    setScreenIdToDelete(screenId);
    setShowModal(true);
  };

  //----- Pagination -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(screenList.length / itemsPerPage);
  const currentData = screenList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //---------------------//

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Screen List</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300 text-xs  text-gray-600 truncate">
            <tr>
              <th className="py-4 px-2 text-center w-16">ID</th>
              <th className="py-4 px-2">Cinema</th>
              <th className="py-4 px-2">Screen</th>
              <th className="py-4 px-2">Screen Type</th>
              <th className="py-4 px-2">Capacity</th>
              <th className="py-4 px-2 w-32 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 truncate">
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2">{item.cinema.name}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">
                  {
                    {
                      sm: 'Small (60s)',
                      md: 'Medium (90s)',
                      lg: 'Large (120s)',
                    }[item.capacity]
                  }
                </td>
                <td className="p-2">
                  <ActionButtons
                    item={item}
                    setSelectedItem={setSelectedScreen}
                    openDeleteModal={openDeleteModal}
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
      {/* Edite Screen */}
      {selectedScreen && (
        <EditScreen
          screen={selectedScreen}
          onClose={() => setSelectedScreen(null)}
          onUpdate={fetchScreens}
        />
      )}
      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this screen?"
      />
    </div>
  );
};

export default TableScreen;
