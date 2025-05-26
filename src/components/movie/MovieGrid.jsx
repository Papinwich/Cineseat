import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4">
      {movies.map((movie) => (
        <div key={movie.id} className="flex justify-center">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
