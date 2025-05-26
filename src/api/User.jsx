import axios from 'axios';

// get users
export const getUsers = async (token) => {
  return await axios.get(`http://localhost:8000/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
