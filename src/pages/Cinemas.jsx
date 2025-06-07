import { getMoviesByCinema } from '@/api/Movie';
import CinemaList from '@/components/cinema/CinemaList';
import MovieGrid from '@/components/movie/MovieGrid';
import MovieTabSwitcher from '@/components/movie/MovieTabSwitcher';
import React, { useEffect, useState } from 'react';

const Cinemas = () => {
  const [movieListByCinema, setMovieListByCinema] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeCinema, setActiveCinema] = useState(null);

  useEffect(() => {
    if (activeCinema?.id) {
      const fetchMovieByCinema = async () => {
        try {
          const res = await getMoviesByCinema(activeCinema.id);
          setMovieListByCinema(res.data);
          // อัปเดต filteredMovies ทันทีหลังจากได้ข้อมูลใหม่
          setFilteredMovies(
            res.data.filter((movie) => movie.status === 'NOW_SHOWING')
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchMovieByCinema();
    }
  }, [activeCinema]);

  const sortedMovies = [...filteredMovies].sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );

  return (
    //container
    <div className="max-w-7xl mx-auto pb-10">
      <h2 className="px-8 py-4 text-center text-[32px] font-bold">
        OUR CINEMA
      </h2>
      <p className="text-center py-1">Select cinema</p>
      {/* Cinema List */}
      <CinemaList onCinemaChange={setActiveCinema} />

      {/* Now Showing | Coming Soon */}
      <MovieTabSwitcher
        movieList={movieListByCinema}
        onTabChange={setFilteredMovies}
      />
      {/* Movie Grid */}
      {sortedMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-start h-screen text-center px-4 pt-10 sm:pt-20">
          <h1 className="text-2xl font-bold text-primary mb-4">
            No Showtimes Available
          </h1>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Please check back later
          </h2>
          <p className="text-gray-600 mb-6">
            Showtimes for this movie are not available at the moment. We’re
            working to update them soon.
          </p>
        </div>
      ) : (
        <MovieGrid movies={sortedMovies} />
      )}
    </div>
  );
};

export default Cinemas;
