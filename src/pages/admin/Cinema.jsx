import FormCinema from '@/components/admin/cinema/FormCinema';
import StatCinema from '@/components/admin/cinema/StatCinema';
import TableCinema from '@/components/admin/cinema/TableCinema';
import HeadlineManage from '@/components/admin/HeadlineManage';
import React from 'react';

const Cinema = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Manage Cinemas" />
      </div>
      <div className="flex mb-6">
        <FormCinema />
        <StatCinema />
      </div>
      <TableCinema />
    </div>
  );
};

export default Cinema;
