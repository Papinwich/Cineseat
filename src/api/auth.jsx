import axios from 'axios';

export const OnRegister = async (data) => {
  return await axios.post('http://localhost:8000/api/register', data);
};

export const login = async (data) => {
  return await axios.post('http://localhost:8000/api/login', data);
};

export const currentUser = async (token) => {
  return await axios.post(
    'http://localhost:8000/api/current-user',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const currentAdmin = async (token) => {
  return await axios.post(
    'http://localhost:8000/api/current-admin',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
