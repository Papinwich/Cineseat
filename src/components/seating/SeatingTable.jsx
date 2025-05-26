import React from 'react';

const SeatingTable = ({ seats, selectedSeats, toggleSeat }) => {
  // ใช้แยก A B C 1 2 3 ออกจากกัน เป็น {row:A,col:1}
  const parseSeatNumber = (seatNumber) => {
    const match = seatNumber.match(/^([A-Z]+)(\d+)$/);
    if (!match) return { row: '', col: 0 };
    return { row: match[1], col: parseInt(match[2], 10) };
  };
  // console.log(seats[0].seat.seatNumber);
  // console.log(parseSeatNumber(seats[0].seat.seatNumber));

  // จัดที่นั่งเป็น object { A: [...], B: [...], ... }
  const rowsMap = {};
  seats.forEach((seat) => {
    const { row } = parseSeatNumber(seat.seat.seatNumber);
    if (!rowsMap[row]) rowsMap[row] = [];
    rowsMap[row].push(seat);
  });

  // จัดเรียงแถวตามตัวอักษร จาก Z-A
  const sortedRowKeys = Object.keys(rowsMap).sort((a, b) => b.localeCompare(a));
  // console.log(Object.keys(rowsMap).sort((a, b) => b.localeCompare(a)));
  const maxColumns = Math.max(
    ...Object.values(rowsMap).map((row) => row.length)
  );
  // console.log(maxColumns);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-separate border-spacing-1">
        {/* <thead>
          <tr>
            <th></th>
            {Array.from({ length: maxColumns }, (_, index) => (
              <th
                key={index}
                className="w-8 h-8 text-center font-semibold text-black "
              >
                {index + 1}
              </th>
            ))}
          </tr>
        </thead> */}
        <thead>
          <tr>
            <td></td>
            {/* Screen */}
            <td colSpan={maxColumns}>
              <div className="h-4 mx-auto flex items-center justify-center bg-gray-800 text-white rounded-sm text-sm w-80">
                SCREEN
              </div>
            </td>
          </tr>

          <tr>
            <th className="px-2 py-1 font-semibold text-gray-800"></th>
            {Array.from({ length: maxColumns }, (_, index) => (
              <th
                key={index}
                className="w-8 min-w-8 h-8 text-center font-semibold text-black"
              >
                {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRowKeys.map((rowKey) => {
            const rowSeats = rowsMap[rowKey].sort((a, b) => {
              const aCol = parseSeatNumber(a.seat.seatNumber).col;
              const bCol = parseSeatNumber(b.seat.seatNumber).col;
              return aCol - bCol;
            });

            return (
              <tr key={rowKey}>
                <td className="px-2 py-1 font-semibold text-black">{rowKey}</td>
                {rowSeats.map((seat) => {
                  const isAvailable = seat.isAvailable;
                  const isSelected = selectedSeats.some(
                    (selected) => selected.id === seat.id
                  );

                  return (
                    <td
                      key={seat.id}
                      onClick={() => {
                        isAvailable && toggleSeat(seat);
                      }}
                      className={`w-8 h-8 rounded border border-black text-center text-slate-500
                    ${
                      !isAvailable
                        ? 'bg-black'
                        : isSelected
                        ? 'bg-primary'
                        : seat.seat.seatType === 'vip'
                        ? 'bg-primary/30'
                        : 'bg-gray-100'
                    }
                    cursor-pointer hover:opacity-70 `}
                    >
                      {/* {seat.seat.seatNumber} */}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SeatingTable;
