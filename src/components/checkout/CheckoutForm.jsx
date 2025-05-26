import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import useStore from '@/store/Store';
import { createCheckoutSession } from '@/api/Stripe';
import { useParams } from 'react-router-dom';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);

const CheckoutForm = () => {
  const { token, user } = useStore();
  const { bookingId } = useParams();

  const fetchClientSecret = async () => {
    // ต้องส่ง booking id ไม่ใช่ user id
    try {
      const res = await createCheckoutSession(token, bookingId);
      // console.log(res.data.clientSecret);
      return res.data.clientSecret;
    } catch (error) {
      console.log(error);
    }
  };

  const options = { fetchClientSecret };
  return (
    <div className="flex-1/2 p-8 sm:p-4">
      <div
        id="checkout"
        className="max-w-4xl p-1 bg-white rounded-sm mx-auto border-2 border-primary"
      >
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default CheckoutForm;
