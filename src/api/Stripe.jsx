import axios from 'axios';

export const createCheckoutSession = async (token, bookingId) => {
  return await axios.post(
    `http://localhost:8000/api/create-checkout-session?bookingId=${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCheckoutStatus = async (token, sessionId) => {
  return await axios.get(
    `http://localhost:8000/api/session-status?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
