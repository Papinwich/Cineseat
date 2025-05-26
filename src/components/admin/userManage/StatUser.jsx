import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import { getUserStat } from '@/api/statistic';
import useStore from '@/store/Store';
import { User } from 'lucide-react';

const StatUser = () => {
  const { token } = useStore();
  const [stat, setStat] = useState({});

  useEffect(() => {
    fetchUserStat();
  }, []);

  const fetchUserStat = async () => {
    try {
      const res = await getUserStat(token);
      setStat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(stat);
  return (
    <div>
      <StatCard title="Total User" value={stat.totalUser} Icon={User} />
    </div>
  );
};
export default StatUser;
