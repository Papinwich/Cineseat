import axios from 'axios';

//get all Showtime-Seat
export const getShowtimeSeats = async (showtime_id) => {
  return await axios.get(
    `http://localhost:8000/api/showtimes/${showtime_id}/seats`
  );
};
