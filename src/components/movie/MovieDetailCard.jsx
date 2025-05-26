import React, { useEffect } from 'react';
import dayjs from 'dayjs';

const MovieDetailCard = ({ movie }) => {
  if (!movie) {
    return <div>No movie data not found</div>;
  }

  return (
    <div>
      <div className="w-full max-w-[300px] space-y-1 bg-white rounded-md overflow-hidden shadow-md ">
        {/* Poster */}
        <img
          className="w-full min-h-[450px] object-cover"
          src={movie.image.url}
          alt={movie.title}
        />

        {/* Name + date */}
        <div className="text-center px-3 py-2">
          <h1 className="font-bold text-md">{movie.title}</h1>
          <h1 className="text-sm">
            {dayjs(movie.release_date).format('D MMM YYYY').toUpperCase()}
          </h1>
          <div>
            {movie.duration} mins | Rate: {movie.rate}
          </div>
          <div>Language: {movie.language}</div>
          <p className="text-left mt-4 pb-3 text-sm">
            {movie.description} Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Sit ratione eveniet, sequi odit architecto,
            officia non autem accusantium veritatis unde reiciendis. Nam
            repellendus, autem minima fuga molestias adipisci provident
            sapiente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
