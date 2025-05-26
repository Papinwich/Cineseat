import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getUserBookings } from '@/api/Booking';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { CircleCheck, CircleDashed, HandCoins } from 'lucide-react';

const UserBookingTable = () => {
  const { user, token } = useStore();
  const [bookings, setBookings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookingsByUserId();
  }, [user]);

  const fetchBookingsByUserId = async () => {
    try {
      //code
      const res = await getUserBookings(token, user.id);
      setBookings(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (!bookings) {
    return <div>loading ...</div>;
  }

  const handlePay = (bookings) => {
    console.log(bookings.bookingId);
    const bookingId = bookings.bookingId;
    navigate(`/checkout/${bookingId}`);
  };

  // console.log(bookings);
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-primary text-white uppercase text-xs">
            <th className="px-4 py-3 text-center">Booking</th>
            <th className="px-4 py-3">Detail</th>
            <th className="px-4 py-3 text-center">Amount</th>
            <th className="px-4 py-3 text-center">Price</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((item, index) => (
            <tr
              key={item.bookingId}
              className={`${
                index % 2 === 0 ? 'bg-white' : 'bg-primary/5 '
              } hover:bg-primary/10 transition-colors`}
            >
              <td className="px-4 py-3 text-center font-medium text-gray-700">
                {item.bookingId}
              </td>
              <td className="px-4 py-3 text-gray-600">
                <div className="font-semibold">
                  {item.tickets[0].movieName} ({item.tickets[0].movieLang})
                </div>
                <div className="text-sm text-gray-500">
                  {dayjs(item.tickets[0].showtimeDatetime).format(
                    'D MMM YYYY HH:mm'
                  )}
                </div>
                <div className="text-sm">{item.tickets[0].cinemaName}</div>
                <div className="font-bold text-sm text-gray-700">
                  {item.tickets.map((t) => t.seatNumber).join(', ')}
                </div>
              </td>
              <td className="px-4 py-3 text-center">{item.tickets.length}</td>
              <td className="px-4 py-3 text-center">{item.totalPrice}</td>
              <td className="px-4 py-3 text-center">
                <div
                  className={`inline-flex items-center gap-1 font-medium ${
                    item.status === 'complete'
                      ? 'text-green-600'
                      : item.status === 'pending'
                      ? 'text-yellow-500'
                      : 'text-gray-500'
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
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handlePay(item)}
                  className={`p-2 rounded-lg transition-all duration-200 text-white ${
                    item.status === 'complete'
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  title="Pay"
                  disabled={item.status === 'complete'}
                >
                  <HandCoins size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookingTable;
