import axios from 'axios';

export const getTickets = async (token, user_id) => {
  return await axios.get(`http://localhost:8000/api/users/${user_id}/tickets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
