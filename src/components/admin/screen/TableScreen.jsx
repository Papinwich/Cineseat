import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { toast } from 'react-toastify';
import EditScreen from './EditScreen';
import ConfirmModal from '@/components/ui/ConfimModal';
import { deleteScreen } from '@/api/Screen';
import ActionButtons from '@/components/ui/ActionButtons';

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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Screen List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 truncate">
              <th className="border border-gray-300 px-4 py-2 w-16">ID</th>
              <th className="border border-gray-300 px-4 py-2 ">Cinema</th>
              <th className="border border-gray-300 px-4 py-2 ">Screen</th>
              <th className="border border-gray-300 px-4 py-2 ">Screen Type</th>
              <th className="border border-gray-300 px-4 py-2 ">Capacity</th>
              <th className="border border-gray-300 px-4 py-2 w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            {screenList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 truncate">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.cinema.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {
                    {
                      sm: 'Small (60s)',
                      md: 'Medium (90s)',
                      lg: 'Large (120s)',
                    }[item.capacity]
                  }
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
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
