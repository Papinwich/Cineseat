import Layout from '@/layouts/Layout';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import Movies from '@/pages/Movies';
import Admin from '@/pages/admin/admin';
import Home from '@/pages/Home';
import Notfound from '@/pages/Notfound';
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import Cinema from '@/pages/admin/Cinema';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Cinemas from '@/pages/Cinemas';
import ProtectRoute from './ProtectRoute';
import ProtectAdmin from './ProtectAdmin';
import Screen from '@/pages/admin/Screen';
import Movie from '@/pages/admin/Movie';
import Showtime from '@/pages/admin/Showtime';
import MovieShowtimeDetail from '@/components/movie/MovieShowtimeDetail';
import Checkout from '@/pages/Checkout';
import PaymentComplete from '@/pages/PaymentComplete';
import MyTickets from '@/pages/MyTickets';
import User from '@/pages/admin/User';
import Booking from '@/pages/admin/Booking';
import UserBooking from '@/pages/UserBooking';

const AppRoutes = () => {
  return (
    <BrowserRouter>
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
        {/* user */}
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
