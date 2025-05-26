import React, { useEffect, useState } from 'react';
import StatCard from '@/components/ui/StatCard';
import { getScreenStat } from '@/api/statistic';
import useStore from '@/store/Store';
import { Projector } from 'lucide-react';

const StatScreen = () => {
  const { token } = useStore();
  const [stat, setStat] = useState({});

  useEffect(() => {
    fetchScreenStat();
  }, []);

  const fetchScreenStat = async () => {
    try {
      const res = await getScreenStat(token);
      setStat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(stat);

  return (
    <div className="ml-6">
      <div className="mb-4">
        <StatCard title="Screens" value={stat.totalScreen} Icon={Projector} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Standard" value={stat.Standard} />
        <StatCard title="IMAX" value={stat.IMAX} />
        <StatCard title="3D" value={stat.treeD} />
        <StatCard title="4DX" value={stat.fourDX} />
      </div>
    </div>
  );
};

export default StatScreen;
