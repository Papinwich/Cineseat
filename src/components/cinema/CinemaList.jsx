import useStore from '@/store/Store';
import React, { useEffect, useState } from 'react';
import MovieGrid from '../movie/MovieGrid';
import ItemList from '../ui/ItemList';

const CinemaList = ({ onCinemaChange }) => {
  const { cinemaList, fetchCinemas } = useStore();
  const [activeCinema, setActiveCinema] = useState(null);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const handleCinemaClick = (cinema) => {
    setActiveCinema(cinema);
    onCinemaChange(cinema);
  };
  // console.log(activeCinema);

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 mx-auto ">
      {cinemaList.map((item) => (
        <ItemList
          name={item.name}
          key={item.id}
          onActive={() => handleCinemaClick(item)}
          isActive={item.id === activeCinema?.id}
        />
      ))}
    </div>
  );
};

export default CinemaList;
