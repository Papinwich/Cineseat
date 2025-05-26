import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import { getMovieStat } from '@/api/statistic';
import useStore from '@/store/Store';
import { Clapperboard, CirclePlay, OctagonX, CalendarFold } from 'lucide-react';

const StatMovie = () => {
  const { token } = useStore();
  const [stat, setStat] = useState({});

  useEffect(() => {
    fetchMovieStat();
  }, []);

  const fetchMovieStat = async () => {
    try {
      const res = await getMovieStat(token);
      setStat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(stat);
  return (
    <div className="ml-6">
      <div className="flex flex-col gap-4">
        <StatCard
          title="Total Movie"
          value={stat.totalMovie}
          Icon={Clapperboard}
        />
        <StatCard title="Showing" value={stat.Showing} Icon={CirclePlay} />
        <StatCard title="Not Available" value={stat.NotAvai} Icon={OctagonX} />
        <StatCard title="Coming Soon" value={stat.Coming} Icon={CalendarFold} />
      </div>
    </div>
  );
};

export default StatMovie;
