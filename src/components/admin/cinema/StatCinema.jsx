import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import { getCinemaStat } from '@/api/statistic';
import useStore from '@/store/Store';
import { Popcorn, Map } from 'lucide-react';

const StatCinema = () => {
  const { token } = useStore();
  const [Stat, setStat] = useState({});

  useEffect(() => {
    fetchCinemaStat();
  }, []);

  const fetchCinemaStat = async () => {
    try {
      const res = await getCinemaStat(token);
      setStat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(Stat);

  return (
    <div className="ml-6">
      <div className="flex gap-4">
        <StatCard title="Cinema" value={Stat.cinemas} Icon={Popcorn} />
        <StatCard title="Location" value={Stat.uniqueLocations} Icon={Map} />
      </div>
    </div>
  );
};

export default StatCinema;
