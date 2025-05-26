import React, { useEffect, useState } from 'react';

const MovieTabSwitcher = ({ movieList, onTabChange }) => {
  const [activeTap, setActiveTap] = useState('NowShowing');

  useEffect(() => {
    const filteredMovies = movieList.filter((movie) => {
      if (activeTap === 'NowShowing') {
        return movie.status === 'NOW_SHOWING';
      } else if (activeTap === 'ComingSoon') {
        return movie.status === 'COMING_SOON';
      }
      return false;
    });
    onTabChange(filteredMovies);
  }, [movieList, activeTap, onTabChange]);

  const handleOnClick = (tap) => {
    setActiveTap(tap);
    // การกรองย้ายไปอยู่ใน useEffect แล้ว
  };

  // const handleOnClick = (tap) => {
  //   setActiveTap(tap);
  //   const filteredMovies = movieList.filter((movie) =>
  //     tap === 'NowShowing'
  //       ? movie.status === 'NOW_SHOWING'
  //       : movie.status === 'COMING_SOON'
  //   );
  //   console.log(filteredMovies);
  //   onTabChange(filteredMovies);
  // };

  //   console.log(activeTap);

  return (
    <div className="flex items-center justify-center gap-0">
      <button
        onClick={() => handleOnClick('NowShowing')}
        className={`px-2 py-4 text-center text-2xl sm:text-3xl font-bold  ${
          activeTap === 'NowShowing'
            ? 'text-black underline underline-offset-4 decoration-2'
            : 'text-black/50'
        }`}
      >
        NOW SHOWING
      </button>
      <span className="text-4xl font-light">|</span>
      <button
        onClick={() => handleOnClick('ComingSoon')}
        className={`px-2 py-4 text-center text-2xl sm:text-3xl font-bold  ${
          activeTap === 'ComingSoon'
            ? 'text-black underline underline-offset-4 decoration-2'
            : 'text-black/50'
        }`}
      >
        COMING SOON
      </button>
    </div>
  );
};

export default MovieTabSwitcher;
