import React, { useEffect, useState } from 'react';
import SeatingTable from './SeatingTable';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store/Store';
import BtnPrime from '../ui/BtnPrime';
import { createBooking } from '@/api/Booking';

const Seating = ({ seats }) => {
  const { selectedSeats, toggleSeat, resetSelectedSeats, user, token } =
    useStore();
  const navigate = useNavigate();

  // รีเซ็ต selectedSeats เมื่อ prop seats เปลี่ยนแปลง
  useEffect(() => {
    resetSelectedSeats();
  }, [seats, resetSelectedSeats]);

  // ฟังก์ชันสำหรับการเลือกที่นั่ง (ย้ายไป store zustand แล้ว)
  // const toggleSeat = (seat) => {
  //   setSelectedSeats((prev) =>
  //     prev.some((selected) => selected.id === seat.id)
  //       ? prev.filter((selected) => selected.id !== seat.id)
  //       : [...prev, seat]
  //   );
  // };
  // console.log(selectedSeats);

  const totalPrice = selectedSeats.reduce(
    (sum, item) => sum + item.seat.price,
    0
  );

  //สร้างฟังชัน createbooking เมื่อกด checkout แล้วจะสร้าง booking ลง DB และเปลี่ยนไปหน้า checkout จ่ายตัง
  const handleCheckout = async () => {
    if (!selectedSeats || selectedSeats.length === 0) {
      alert('กรุณาเลือกที่นั่งอย่างน้อยหนึ่งที่นั่ง');
      return;
    }
    try {
      const data = {
        user_id: user.id,
        showtimeId: selectedSeats[0].showtimeId,
        seatIds: selectedSeats.map((i) => i.seatId),
      };
      // console.log(data);
      const res = await createBooking(token, data);
      const bookingId = res.data.data.booking.id;
      // console.log('create booking', res.data.data.booking.id);
      navigate(`/checkout/${bookingId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Seating Table */}
      <div className="flex flex-col sm:flex-row">
        <SeatingTable
          seats={seats}
          selectedSeats={selectedSeats}
          toggleSeat={toggleSeat}
        />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 mt-5 sm:flex-col sm:justify-start sm:ml-5">
          {[
            { label: 'Reserved', color: 'bg-black' },
            { label: 'Selecting', color: 'bg-primary' },
            { label: 'Available', color: 'bg-gray-100' },
            { label: 'VIP', color: 'bg-primary/30' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 w-40">
              <div
                className={`w-6 h-6 rounded border border-black ${color}`}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-80 mt-4 sm:ml-8 border-2 border-primary p-3 rounded-md bg-gray-100 mx-auto">
        {/* Detail */}
        <p>
          Your selected seat:{' '}
          <span className="font-bold text-lg">
            {selectedSeats.length > 0
              ? selectedSeats.map((seat) => seat.seat.seatNumber).join(', ')
              : 'none'}
          </span>
        </p>
        {/* Price Summary */}
        <p>
          Total({selectedSeats.length} ticket) :
          <span className="font-bold text-lg">{totalPrice} baht</span>
        </p>

        {/* Checkout Button */}
        {!user ? (
          <div>please login </div>
        ) : (
          <div className="mt-6">
            <BtnPrime ButtonText={'Checkout'} onClick={handleCheckout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Seating;
