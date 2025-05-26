import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import { getShowtimeStat } from '@/api/statistic';
import useStore from '@/store/Store';
import { Table } from 'lucide-react';

const StatShowtime = () => {
  const { token } = useStore();
  const [stat, setStat] = useState({});

  useEffect(() => {
    fetchShowtimeStat();
  }, []);

  const fetchShowtimeStat = async () => {
    try {
      const res = await getShowtimeStat(token);
      setStat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(stat);
  return (
    <div className="ml-6">
      <StatCard
        title="Total Showtime"
        value={stat.totalShowtime}
        Icon={Table}
      />
    </div>
  );
};

export default StatShowtime;
