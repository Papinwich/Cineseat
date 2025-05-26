import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getBookings } from '@/api/Booking';

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
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 truncate">
              <th className="border border-gray-300 px-4 py-2 w-16">
                Booking ID
              </th>
              <th className="border border-gray-300 px-4 py-2">By Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 truncate">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.totalPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBooking;
