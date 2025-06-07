import Banner from '@/components/home/Banner';
import MovieGrid from '@/components/movie/MovieGrid';
import useStore from '@/store/Store';
import React, { useEffect } from 'react';

const Home = () => {
  const { fetchMovies, movieList } = useStore();
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const sortedMovies = movieList
    .filter((movie) => movie.status === 'NOW_SHOWING')
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  return (
    <div>
      <div className="relative">
        {/* Banner */}
        <Banner />
        {/* Text  */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-white text-md sm:text-2xl md:text-3xl font-bold">
            Find and reserve the best seats.
          </h1>
        </div>
      </div>

      {/* container */}
      <div className="max-w-7xl mx-auto pb-10">
        {/*Now Showing*/}
        <h2 className="px-8 py-4 text-center text-[32px] font-bold underline underline-offset-4">
          NOW SHOWING
        </h2>
        {/*Movie Grid*/}
        <MovieGrid movies={sortedMovies} />
      </div>
    </div>
  );
};

export default Home;
