import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { getTickets } from '@/api/ticket';
import TicketCard from './TicketCard';

const TicketList = () => {
  const { user, token } = useStore();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const userId = Number(user.id);
      const res = await getTickets(token, userId);
      setTickets(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.ticketId} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
