import UserBookingTable from '@/components/UserBooking/UserBookingTable';
import React from 'react';

const UserBooking = () => {
  return (
    //container
    <div className="mx-auto max-w-7xl">
      <h2 className="px-8 py-4 text-center text-[32px] font-bold">Bookings</h2>
      <div className="px-4 ">
        <UserBookingTable />
      </div>
    </div>
  );
};

export default UserBooking;
