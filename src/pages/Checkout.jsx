import React from 'react';
import SummaryDetail from '@/components/checkout/SummaryDetail';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const Checkout = () => {
  return (
    //container
    <div className="mx-auto max-w-7xl">
      <h2 className="px-8 py-4 text-center text-[32px] font-bold">Checkout</h2>
      <div className="flex flex-col sm:flex-row">
        <SummaryDetail />
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
