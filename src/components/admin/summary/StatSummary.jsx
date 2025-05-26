import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import {
  getCinemaStat,
  getScreenStat,
  getMovieStat,
  getShowtimeStat,
  getBookingStat,
  getUserStat,
} from '@/api/statistic';
import useStore from '@/store/Store';
import {
  Popcorn,
  Map,
  Projector,
  Clapperboard,
  CirclePlay,
  OctagonX,
  CalendarFold,
  Table,
  Book,
  CircleCheck,
  CircleDashed,
  User,
} from 'lucide-react';

const StatSummary = () => {
  const { token } = useStore();
  const [stats, setStats] = useState({
    cinema: {},
    screen: {},
    movie: {},
    showtime: {},
    booking: {},
    user: {},
  });

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [
          cinemaRes,
          screenRes,
          movieRes,
          showtimeRes,
          bookingRes,
          userRes,
        ] = await Promise.all([
          getCinemaStat(token),
          getScreenStat(token),
          getMovieStat(token),
          getShowtimeStat(token),
          getBookingStat(token),
          getUserStat(token),
        ]);

        setStats({
          cinema: cinemaRes.data.data,
          screen: screenRes.data.data,
          movie: movieRes.data.data,
          showtime: showtimeRes.data.data,
          booking: bookingRes.data.data,
          user: userRes.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllStats();
  }, [token]);

  return (
    <div className="space-y-8">
      {/* Cinema */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-gray-300">
          Cinema
        </h2>
        <div className="flex flex-wrap gap-4">
          <StatCard
            title="Cinema"
            value={stats.cinema.cinemas}
            Icon={Popcorn}
          />
          <StatCard
            title="Location"
            value={stats.cinema.uniqueLocations}
            Icon={Map}
          />
        </div>
      </div>

      {/* Screen */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-gray-300">
          Screen
        </h2>
        <div className="mb-6 flex">
          <StatCard
            title="Screens"
            value={stats.screen.totalScreen}
            Icon={Projector}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <StatCard title="Standard" value={stats.screen.Standard} />
          <StatCard title="IMAX" value={stats.screen.IMAX} />
          <StatCard title="3D" value={stats.screen.treeD} />
          <StatCard title="4DX" value={stats.screen.fourDX} />
        </div>
      </div>

      {/* Movie */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-gray-300">
          Movie
        </h2>
        <div className="mb-6 flex">
          <StatCard
            title="Total Movie"
            value={stats.movie.totalMovie}
            Icon={Clapperboard}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <StatCard
            title="Showing"
            value={stats.movie.Showing}
            Icon={CirclePlay}
          />
          <StatCard
            title="Not Available"
            value={stats.movie.NotAvai}
            Icon={OctagonX}
          />
          <StatCard
            title="Coming Soon"
            value={stats.movie.Coming}
            Icon={CalendarFold}
          />
        </div>
      </div>

      {/* Showtime */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-gray-300">
          Showtime
        </h2>
        <div className="flex">
          <StatCard
            title="Total Showtime"
            value={stats.showtime.totalShowtime}
            Icon={Table}
          />
        </div>
      </div>

      {/* Booking */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-gray-300">
          Booking
        </h2>
        <div className="mb-6 flex">
          <StatCard
            title="Total Booking"
            value={stats.booking.totalBooking}
            Icon={Book}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <StatCard
            title="Complete"
            value={stats.booking.complete}
            Icon={CircleCheck}
          />
          <StatCard
            title="Pending"
            value={stats.booking.pending}
            Icon={CircleDashed}
          />
        </div>
      </div>

      {/* User */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2 border-gray-300">
          User
        </h2>
        <div className="flex">
          <StatCard
            title="Total User"
            value={stats.user.totalUser}
            Icon={User}
          />
        </div>
      </div>
    </div>
  );
};

export default StatSummary;
