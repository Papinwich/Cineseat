import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getBookingStat } from '@/api/statistic';
import StatCard from '@/components/ui/StatCard';
import { Book, CircleCheck, CircleDashed } from 'lucide-react';

const StatBooking = () => {
  const { token } = useStore();
  const [stat, setStat] = useState({});

  useEffect(() => {
    fetchBookingStat();
  }, []);
  const fetchBookingStat = async () => {
    try {
      const res = await getBookingStat(token);
      setStat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(stat);

  return (
    <div className="flex  gap-4">
      <StatCard title="Total Booking" value={stat.totalBooking} Icon={Book} />
      <StatCard title="Complete" value={stat.complete} Icon={CircleCheck} />
      <StatCard title="Pending" value={stat.pending} Icon={CircleDashed} />
    </div>
  );
};

export default StatBooking;
