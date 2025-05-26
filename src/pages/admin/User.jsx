import React from 'react';
import HeadlineManage from '@/components/admin/HeadlineManage';
import TableUser from '@/components/admin/userManage/TableUser';
import StatUser from '@/components/admin/userManage/StatUser';

const User = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Manage User" />
      </div>
      <div className="mb-6">
        <StatUser />
      </div>
      <TableUser />
    </div>
  );
};

export default User;
