import React from 'react';
import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';

const TicketCard = ({ ticket }) => {
  return (
    <div className="flex min-w-100 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-center bg-primary/80">
        <img
          className="-rotate-90 w-12 h-auto"
          src="https://res.cloudinary.com/dnl2ixhcx/image/upload/v1747987288/CINESEATlogoWhite_qtrwlr.svg"
          alt="Logo"
        />
      </div>

      {/* Detail */}
      <div className="flex-1 px-6 py-4">
        <div className="text-2xl font-bold text-primary mb-2">
          {ticket.movieName}
        </div>
        <p className="text-sm">Language: {ticket.movieLang}</p>
        <p className="text-sm">
          Cinema: {ticket.cinemaName}, {ticket.cinemaLocation}
        </p>
        <p className="text-sm">
          Screen: <span className="font-bold">{ticket.screenName}</span> (
          {ticket.screenType})
        </p>
        <p className="text-sm">
          Seat: <span className="font-semibold">{ticket.seatNumber}</span> (
          {ticket.seatType})
        </p>
        <p className="text-sm">
          Showtime:{' '}
          <span className="font-semibold">
            {dayjs(ticket.showtimeDatetime).format('D MMM YYYY, HH:mm')}
          </span>
        </p>
      </div>

      {/* เส้น  */}
      <div className="w-px bg-gray-300 mx-1 my-4"></div>

      {/* QR Code */}
      <div className="flex items-center justify-center px-4 py-4 bg-gray-100">
        <QRCodeSVG
          value={JSON.stringify({
            ticketId: ticket.ticketId,
            movieName: ticket.movieName,
            cinemaName: ticket.cinemaName,
            seatNumber: ticket.seatNumber,
            showtime: ticket.showtimeDatetime,
          })}
          size={100}
          className="border border-gray-300 p-2 rounded bg-white"
        />
      </div>
    </div>
  );
};

export default TicketCard;
