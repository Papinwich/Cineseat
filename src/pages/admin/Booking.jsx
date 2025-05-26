import React from 'react';
import HeadlineManage from '@/components/admin/HeadlineManage';
import StatBooking from '@/components/admin/booking/StatBooking';
import TableBooking from '@/components/admin/booking/TableBooking';

const Booking = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Manage Booking" />
      </div>
      <div className="mb-6">
        <StatBooking />
      </div>
      <TableBooking />
    </div>
  );
};

export default Booking;
