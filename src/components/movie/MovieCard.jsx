import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}/showtimes`}>
      <div className="w-full min-w-[200px] max-w-[200px] space-y-1 bg-white rounded-md overflow-hidden shadow-md flex-shrink-0 hover:scale-101">
        {/* Poster */}
        <img
          className="w-full h-[300px] object-cover flex-shrink-0"
          src={movie.image.url}
          alt={movie.title}
        />

        {/* Name + date */}
        <div className="text-center p-2">
          <h1 className="font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {movie.title}
          </h1>
          <div className="text-sm">
            {dayjs(movie.release_date).format('D MMM YYYY').toUpperCase()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
