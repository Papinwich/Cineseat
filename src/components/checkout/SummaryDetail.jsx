import React, { useEffect, useState } from 'react';
import useStore from '@/store/Store';
import { useParams } from 'react-router-dom';
import { getABooking } from '@/api/Booking';
import _ from 'lodash';
import dayjs from 'dayjs';

const SummaryDetail = () => {
  const { token, user } = useStore();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchABooking();
  }, [bookingId]);

  const fetchABooking = async () => {
    try {
      //code
      const res = await getABooking(token, user.id, bookingId);
      setBooking(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (!booking) return <div>Loading...</div>;

  // Group tickets by unique key excluding seatNumber
  const groupedTickets = _.values(
    _.groupBy(
      booking.tickets,
      (ticket) =>
        `${ticket.movieName}|${ticket.movieLang}|${ticket.cinemaName}|${ticket.cinemaLocation}|${ticket.screenName}|${ticket.screenType}|${ticket.showtimeDatetime}|${ticket.seatPrice}|${ticket.seatType}`
    )
  );
  // console.log(groupedTickets);

  return (
    <div className="flex-1/2">
      <div className="flex flex-col w-80 mt-4 sm:mx-auto border-2 border-primary p-3 rounded-md bg-gray-100 mx-auto">
        <h3 className="text-xl font-bold">Booking ID: {booking.bookingId}</h3>
        <p>Total Price: {booking.totalPrice} Baht</p>
        <p>Status: {booking.status}</p>
        <h4 className="mt-4 font-semibold">Tickets:</h4>
        <ul className="list-disc pl-5 space-y-3">
          {groupedTickets.map((group, index) => {
            const sample = group[0]; // representative ticket
            const seatNumbers = group.map((t) => t.seatNumber).join(', ');
            return (
              <li key={index}>
                <p>
                  {sample.movieName} ({sample.movieLang})
                </p>
                <p>{sample.cinemaName}</p>
                <p>
                  {sample.screenName} ({sample.screenType})
                </p>
                <p>
                  {dayjs(sample.showtimeDatetime).format('D MMM YYYY HH:mm')}
                </p>
                <p>
                  Seats:{' '}
                  <span className="text-lg font-bold">{seatNumbers}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SummaryDetail;
