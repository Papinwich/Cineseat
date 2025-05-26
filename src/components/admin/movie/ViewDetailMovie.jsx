import React from 'react';
import dayjs from 'dayjs';

const ViewDetailMovie = ({ movie, onClose }) => {
  //   console.log(movie);
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Movie Detail</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Preview Column - Left Side */}
          <div className="w-1/3">
            {movie.image?.url && (
              <div className="mb-4">
                <p className="font-bold mb-2">Poster:</p>
                <img
                  src={movie.image.url}
                  alt={movie.title}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Detail Column - Right Side */}
          <div className="w-2/3">
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-bold">Title:</label>
                <p className="text-gray-700">{movie.title}</p>
              </div>

              <div>
                <label className="font-bold">Description:</label>
                <p className="text-gray-700">{movie.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold">Release date:</label>
                  <p className="text-gray-700">
                    {dayjs(movie.release_date)
                      .format('D MMM YYYY')
                      .toUpperCase()}
                  </p>
                </div>

                <div>
                  <label className="font-bold">Language:</label>
                  <p className="text-gray-700">{movie.language}</p>
                </div>

                <div>
                  <label className="font-bold">Rate:</label>
                  <p className="text-gray-700">{movie.rate}</p>
                </div>

                <div>
                  <label className="font-bold">Duration (min):</label>
                  <p className="text-gray-700">{movie.duration}</p>
                </div>
              </div>

              <div>
                <label className="font-bold">Status:</label>
                <p className="text-gray-700">
                  {movie.status === 'NOT_AVAILABLE' && 'Not Available'}
                  {movie.status === 'NOW_SHOWING' && 'Showing'}
                  {movie.status === 'COMING_SOON' && 'Coming Soon'}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailMovie;
