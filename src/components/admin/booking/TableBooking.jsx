import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getBookings } from '@/api/Booking';
import TablePagination from '@/components/ui/TablePagination';
import { CircleCheck, CircleDashed } from 'lucide-react';

const TableBooking = () => {
  const { token } = useStore();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBooking();
  }, []);
  const fetchBooking = async () => {
    const res = await getBookings(token);
    setBookings(res.data.data);
  };
  //   console.log(bookings);
  //----- Pagination -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentData = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //---------------------//

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 ">
        <table className="min-w-full bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300 text-xs  text-gray-600 truncate">
            <tr>
              <th className="py-4 px-2 text-center w-16">Booking ID</th>
              <th className="py-4 px-2 min-w-36">Username</th>
              <th className="py-4 px-2 min-w-36">Email</th>
              <th className="py-4 px-2 w-24">Price</th>
              <th className="py-4 px-2 w-28">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 truncate">
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2">{item.user.username}</td>
                <td className="p-2">{item.user.email}</td>
                <td className="p-2">{item.totalPrice}</td>
                <td className="p-2">
                  <span
                    className={`inline-flex items-center gap-1 py-1 px-2 text-xs font-medium rounded-full ${
                      item.status === 'complete'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status === 'complete' ? (
                      <CircleCheck size={16} />
                    ) : item.status === 'pending' ? (
                      <CircleDashed size={16} />
                    ) : (
                      ''
                    )}
                    {item.status}
                  </span>
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
    </div>
  );
};

export default TableBooking;
