import axios from 'axios';

// create movie
export const createMovie = async (token, formData) => {
  return await axios.post('http://localhost:8000/api/movies/', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// get all movie
export const getMovies = async () => {
  return await axios.get('http://localhost:8000/api/movies/', {});
};

// get all movies by cinema (cinema_id)
export const getMoviesByCinema = async (cinema_id) => {
  return await axios.get(`http://localhost:8000/api/${cinema_id}/movies`);
};

// delete a movie
export const deleteMovie = async (token, movie_id) => {
  return await axios.delete(`http://localhost:8000/api/movies/${movie_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// update a movie
export const updateMovie = async (token, movie_id, formData) => {
  return await axios.put(
    `http://localhost:8000/api/movies/${movie_id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

//update movie Status (Now Showing)
export const updateMovieStatus = async (token, movie_id, updatedStatus) => {
  return await axios.patch(
    `http://localhost:8000/api/movies/${movie_id}/status`,
    updatedStatus,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
