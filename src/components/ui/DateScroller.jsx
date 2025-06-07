import React, { useState } from 'react';
import DateSelector from '../ui/DateSelector';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateScroller = ({ dates, activeDate, onDateSelect }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  // console.log(startIndex);

  // ตัดวันตั้งแต่ index ที่ startIndex ถึง +5
  const visibleDates = dates.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const goNext = () => {
    if (startIndex + itemsPerPage < dates.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={goPrev}
        disabled={startIndex === 0}
        className="cursor-pointer disabled:opacity-30"
      >
        <ChevronLeft />
      </button>

      <div className="flex gap-2">
        {visibleDates.map((date, index) => (
          <DateSelector
            key={index}
            name={date.date}
            onActive={() => onDateSelect(date.date)}
            isActive={activeDate === date.date}
          />
        ))}
      </div>

      <button
        onClick={goNext}
        disabled={startIndex + itemsPerPage >= dates.length}
        className="cursor-pointer disabled:opacity-30"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default DateScroller;
