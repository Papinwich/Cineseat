import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-gray-100 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
