import useStore from '@/store/Store';
import React, { useEffect, useState } from 'react';
import MovieGrid from '@/components/movie/MovieGrid';
import MovieTabSwitcher from '@/components/movie/MovieTabSwitcher';

const Movies = () => {
  const { fetchMovies, movieList } = useStore();
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  const [filteredMovies, setFilteredMovies] = useState(movieList);

  return (
    //container
    <div className="max-w-7xl mx-auto pb-10">
      {/*Now Showing | Coming Soon*/}
      <MovieTabSwitcher movieList={movieList} onTabChange={setFilteredMovies} />
      {/* Movie Grid */}
      <MovieGrid movies={filteredMovies} />
    </div>
  );
};

export default Movies;
