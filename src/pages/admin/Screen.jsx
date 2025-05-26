import React from 'react';
import HeadlineManage from '@/components/admin/HeadlineManage';
import FormScreen from '../../components/admin/screen/FormScreen';
import StatScreen from '@/components/admin/screen/StatScreen';
import TableScreen from '@/components/admin/screen/TableScreen';

const Screen = () => {
  return (
    <div>
      <div className="mb-6">
        <HeadlineManage text="Manage Screens" />
      </div>
      <div className="flex mb-6">
        <FormScreen />
        <StatScreen />
      </div>
      <TableScreen />
    </div>
  );
};

export default Screen;
