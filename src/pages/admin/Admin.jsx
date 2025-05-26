import StatCinema from '@/components/admin/cinema/StatCinema';
import HeadlineManage from '@/components/admin/HeadlineManage';
import StatSummary from '@/components/admin/summary/StatSummary';
import React from 'react';

const Admin = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Summary" />
      </div>
      <div className="mb-6">
        <StatSummary />
      </div>
    </div>
  );
};

export default Admin;
