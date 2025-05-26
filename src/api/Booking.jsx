import axios from 'axios';

export const createBooking = async (token, data) => {
  const user_id = Number(data.user_id);
  return await axios.post(
    `http://localhost:8000/api/users/${user_id}/bookings`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get bookings
export const getBookings = async (token) => {
  return await axios.get(`http://localhost:8000/api/users/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get all bookings for a user
export const getUserBookings = async (token, user_id) => {
  return await axios.get(
    `http://localhost:8000/api/users/${user_id}/bookings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get a booking for SummaryDetail component in Checkout Page
export const getABooking = async (token, user_id, booking_id) => {
  return await axios.get(
    `http://localhost:8000/api/users/${user_id}/bookings/${booking_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
