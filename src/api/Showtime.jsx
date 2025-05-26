import axios from 'axios';

// create showtime (showtimeSeat also create)
export const createShowtime = async (token, data) => {
  return await axios.post(
    `http://localhost:8000/api/screens/${data.screenId}/showtimes`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get All showtimes
export const getAllShowtime = async () => {
  return await axios.get('http://localhost:8000/api/showtimes');
};

// ไม่ใช้
export const getShowtimeByScreen = async (screen_id) => {
  return await axios.get(
    `http://localhost:8000/api/screens/${screen_id}/showtimes`
  );
};

// delete a showtime
export const deleteShowtime = async (token, showtime_id) => {
  return await axios.delete(
    `http://localhost:8000/api/showtimes/${showtime_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// update a showtime
export const updateShowtime = async (token, showtime_id, data) => {
  return await axios.put(
    `http://localhost:8000/api/showtimes/${showtime_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
