import React from 'react';
import HeadlineManage from '@/components/admin/HeadlineManage';
import FormMovie from '@/components/admin/movie/FormMovie';
import TableMovie from '@/components/admin/movie/TableMovie';
import StatMovie from '@/components/admin/movie/StatMovie';

const Movie = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Manage Movies" />
      </div>
      <div className="flex mb-6">
        <FormMovie />
        <StatMovie />
      </div>
      <TableMovie />
    </div>
  );
};

export default Movie;
