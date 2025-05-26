import axios from 'axios';

export const getCinemaStat = async (token) => {
  return await axios.get('http://localhost:8000/api/stat/cinema', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getScreenStat = async (token) => {
  return await axios.get('http://localhost:8000/api/stat/screen', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMovieStat = async (token) => {
  return await axios.get('http://localhost:8000/api/stat/movie', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getShowtimeStat = async (token) => {
  return await axios.get('http://localhost:8000/api/stat/showtime', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserStat = async (token) => {
  return await axios.get('http://localhost:8000/api/stat/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBookingStat = async (token) => {
  return await axios.get('http://localhost:8000/api/stat/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
