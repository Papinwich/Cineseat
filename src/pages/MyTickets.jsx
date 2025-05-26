import TicketList from '@/components/ticket/TicketList';
import React from 'react';

const MyTickets = () => {
  return (
    //container
    <div className="mx-auto max-w-7xl">
      <h2 className="px-8 py-4 text-center text-[32px] font-bold">
        My Tickets
      </h2>
      <TicketList />
    </div>
  );
};

export default MyTickets;
