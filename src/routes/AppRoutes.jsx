import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

import ScrollToTop from './ScrollToTop';
import ProtectRoute from './ProtectRoute';
import ProtectAdmin from './ProtectAdmin';

import Layout from '@/layouts/Layout';
import LayoutAdmin from '@/layouts/LayoutAdmin';

import Home from '@/pages/Home';
import Movies from '@/pages/Movies';
import MovieShowtimeDetail from '@/components/movie/MovieShowtimeDetail';
import Cinemas from '@/pages/Cinemas';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Notfound from '@/pages/Notfound';

import Checkout from '@/pages/Checkout';
import PaymentComplete from '@/pages/PaymentComplete';
import MyTickets from '@/pages/MyTickets';
import UserBooking from '@/pages/UserBooking';

import Admin from '@/pages/admin/admin';
import Cinema from '@/pages/admin/Cinema';
import Screen from '@/pages/admin/Screen';
import Movie from '@/pages/admin/Movie';
import Showtime from '@/pages/admin/Showtime';
import User from '@/pages/admin/User';
import Booking from '@/pages/admin/Booking';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route
            path="movies/:movieId/showtimes"
            element={<MovieShowtimeDetail />}
          />
          <Route path="cinemas" element={<Cinemas />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* User */}
        <Route element={<ProtectRoute element={<Layout />} />}>
          <Route path="checkout/:bookingId" element={<Checkout />} />
          <Route path="return" element={<PaymentComplete />} />
          <Route path="mytickets" element={<MyTickets />} />
          <Route path="booking" element={<UserBooking />} />
        </Route>

        {/* Admin */}
        <Route
          path="admin"
          element={<ProtectAdmin element={<LayoutAdmin />} />}
        >
          <Route index element={<Admin />} />
          <Route path="cinema" element={<Cinema />} />
          <Route path="screen" element={<Screen />} />
          <Route path="movie" element={<Movie />} />
          <Route path="showtime" element={<Showtime />} />
          <Route path="user" element={<User />} />
          <Route path="booking" element={<Booking />} />
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
