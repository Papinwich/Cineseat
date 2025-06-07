import useStore from '@/store/Store';
import React, { useEffect, useState } from 'react';
import MovieGrid from '@/components/movie/MovieGrid';
import MovieTabSwitcher from '@/components/movie/MovieTabSwitcher';

const Movies = () => {
  const { fetchMovies, movieList } = useStore();
  const [filteredMovies, setFilteredMovies] = useState(movieList);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        await fetchMovies();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMovies();
  }, [fetchMovies]);

  const sortedMovies = [...filteredMovies].sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );

  return (
    //container
    <div className="max-w-7xl mx-auto pb-10">
      {isLoading ? (
        <div className="text-center py-10">Loading</div>
      ) : (
        <>
          {/*Now Showing | Coming Soon*/}
          <MovieTabSwitcher
            movieList={movieList}
            onTabChange={setFilteredMovies}
          />
          {/* Movie Grid */}
          <MovieGrid movies={sortedMovies} />
        </>
      )}
    </div>
  );
};

export default Movies;
