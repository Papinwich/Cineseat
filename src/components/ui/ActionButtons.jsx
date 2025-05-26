import React from 'react';
import { SquarePen, Trash2, Eye } from 'lucide-react';

const ActionButtons = ({
  item,
  setSelectedItem,
  openDeleteModal,
  viewDetail,
}) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      {viewDetail && (
        <button
          onClick={() => viewDetail(item)}
          className="bg-yellow-400 text-white p-1 rounded-md hover:bg-yellow-500 cursor-pointer"
          title="View detial"
        >
          <Eye size={20} />
        </button>
      )}

      <button
        onClick={() => setSelectedItem(item)}
        className="bg-blue-400 text-white p-1 rounded-md hover:bg-blue-500 cursor-pointer"
        title="Edit"
      >
        <SquarePen size={20} />
      </button>
      <button
        onClick={() => openDeleteModal(item.id)}
        className="bg-red-400 text-white p-1 rounded-md hover:bg-red-500 cursor-pointer"
        title="Delete"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
