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
      <MovieGrid movies={filteredMovies} />
    </div>
  );
};

export default Cinemas;
