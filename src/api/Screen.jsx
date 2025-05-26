import axios from 'axios';

// create screen with seats
export const createScreen = async (token, data) => {
  const cinema_id = Number(data.cinemaId);
  return await axios.post(
    `http://localhost:8000/api/cinemas/${cinema_id}/screens`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//get all screen
export const getScreens = async () => {
  return await axios.get('http://localhost:8000/api/screens', {});
};

//delete a screen
export const deleteScreen = async (token, screen_id) => {
  return await axios.delete(`http://localhost:8000/api/screens/${screen_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//update a screen
export const updateScreen = async (token, screen_id, data) => {
  return await axios.put(
    `http://localhost:8000/api/screens/${screen_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
