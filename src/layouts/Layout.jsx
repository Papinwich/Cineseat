import Footer from '@/components/Footer';
import MainNav from '@/components/navbar/MainNav';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 mt-40 md:mt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
<div className=""></div>;
