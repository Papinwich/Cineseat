import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { getCheckoutStatus } from '@/api/Stripe';
import useStore from '@/store/Store';
import BtnPrime from '../ui/BtnPrime';

const Return = () => {
  const { token } = useStore();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);

  //   console.log(sessionId);
  useEffect(() => {
    fetchCheckoutStatus();
  }, []);

  const handleToTicket = async () => {
    try {
      console.log('my ticket');
      navigate(`/mytickets`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCheckoutStatus = async () => {
    try {
      const res = await getCheckoutStatus(token, sessionId);
      setStatus(res.data.status);
      // console.log(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  if (status === 'complete') {
    return (
      <section
        className="mx-auto mt-10 w-100 rounded-lg border border-primary bg-white p-6 shadow-xl"
        id="success"
      >
        <h1 className="text-center text-2xl font-bold text-primary">
          Payment Complete
        </h1>
        <p className="my-4 text-gray-700">
          Thanks for booking your movie night with us! Your payment was
          successful, and a confirmation email is on its way. If you need
          anything, we're always here to help.
        </p>

        <p className="text-sm text-gray-700">click below to see your tickets</p>
        <BtnPrime ButtonText={'See My ticket'} onClick={handleToTicket} />
      </section>
    );
  }

  return <div>Return</div>;
};

export default Return;
