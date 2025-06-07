import axios from 'axios';

// create cinema
export const createCinema = async (token, data) => {
  return await axios.post('http://localhost:8000/api/cinemas', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get cinemas
export const getCinemas = async () => {
  return await axios.get('http://localhost:8000/api/cinemas', {});
};

// update cinema
export const updateCinema = async (token, cinema_id, data) => {
  return axios.put(`http://localhost:8000/api/cinemas/${cinema_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// delete cinema
export const deleteCinema = async (token, cinema_id) => {
  return await axios.delete(`http://localhost:8000/api/cinemas/${cinema_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
