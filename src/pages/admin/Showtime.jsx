import React from 'react';
import HeadlineManage from '@/components/admin/HeadlineManage';
import FormShowtime from '@/components/admin/showtime/FormShowtime';
import StatShowtime from '@/components/admin/showtime/StatShowtime';
import TableShowtime from '@/components/admin/showtime/TableShowtime';

const Showtime = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Manage Showtimes" />
      </div>
      <div className="flex mb-6">
        <FormShowtime />
        <StatShowtime />
      </div>
      <TableShowtime />
    </div>
  );
};

export default Showtime;
