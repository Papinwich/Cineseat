import useStore from '@/store/Store';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailCard from './MovieDetailCard';
import HeadText from '../ui/HeadText';
import _ from 'lodash';
import dayjs from 'dayjs';
import Seating from '../seating/Seating';
import CinemaSelector from '../ui/CinemaSelector';
import DateSelector from '../ui/DateSelector';
import ShowtimeSelector from '../ui/ShowtimeSelector';
import DateScroller from '../ui/DateScroller';

const MovieShowtimeDetail = () => {
  const {
    fetchMovies,
    movieList,
    fetchShowtimes,
    showtimeList,
    fetchShowtimeSeats,
    showtimeSeats,
  } = useStore();
  const { movieId } = useParams();

  const [activeCinema, setActiveCinema] = useState(null);
  const [dates, setDates] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [activeShowtime, setActiveShowtime] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchShowtimes();
    if (activeShowtime) {
      fetchShowtimeSeats(activeShowtime.id);
    }
  }, [fetchMovies, fetchShowtimes, activeShowtime, fetchShowtimeSeats]);

  const movie = movieList.find((p) => p.id === Number(movieId));
  // cinema ที่ฉายเรื่องนี้อยู่
  const cinemaFilter = _.uniqBy(
    _.map(
      _.filter(showtimeList, (p) => p.Movie.id === Number(movieId)),
      (p) => ({
        id: p.screen.cinema.id,
        name: p.screen.cinema.name,
      })
    ),
    'id'
  );

  // ถ้าไม่ได้เลือก Cinema ให้เลือก Cinema ที่เลือกได้
  useEffect(() => {
    if (cinemaFilter.length > 0 && !activeCinema) {
      setActiveCinema(cinemaFilter[0]);
    }
  }, [cinemaFilter, activeCinema]);

  // กรองและเรียงวันที่
  useEffect(() => {
    if (activeCinema) {
      const showtimeFilter = showtimeList.filter(
        (showtime) =>
          showtime.Movie.id === Number(movieId) &&
          showtime.screen.cinema.id === activeCinema.id
      );

      // ดึงวันที่ที่ไม่ซ้ำกันและเรียงตามลำดับ
      const dateFilter = _.uniqBy(
        showtimeFilter.map((showtime) => ({
          date: dayjs(showtime.datetime).format('ddd MMM D'),
          timestamp: dayjs(showtime.datetime).valueOf(), // ใช้สำหรับการเรียงลำดับ
        })),
        'date'
      ).sort((a, b) => a.timestamp - b.timestamp); // เรียงวันที่จากน้อยไปมาก

      setDates(dateFilter);

      if (dateFilter.length > 0 && !activeDate) {
        setActiveDate(dateFilter[0].date); // เลือกวันที่แรกเป็นค่าเริ่มต้น
      }

      setShowtimes(showtimeFilter);
    }
  }, [showtimeList, activeCinema, movieId, activeDate]);

  // กรองและเรียงรอบฉายตามวันที่
  useEffect(() => {
    if (activeCinema && activeDate) {
      const filteredShowtimes = showtimeList
        .filter(
          (showtime) =>
            showtime.Movie.id === Number(movieId) &&
            showtime.screen.cinema.id === activeCinema.id &&
            dayjs(showtime.datetime).format('ddd MMM D') === activeDate
        )
        .sort(
          (a, b) => dayjs(a.datetime).valueOf() - dayjs(b.datetime).valueOf()
        ); // เรียงรอบฉายจากน้อยไปมาก

      setShowtimes(filteredShowtimes);
    }
  }, [activeCinema, activeDate, showtimeList, movieId]);

  const showtimesByScreen = _.groupBy(showtimes, 'screen.name');
  // console.log(showtimesByScreen);
  // console.log(Object.keys(showtimesByScreen));

  const handleCinemaClick = (cinema) => {
    setActiveCinema(cinema);
    setActiveDate(null); // รีเซ็ตวันที่เมื่อเปลี่ยนโรงภาพยนตร์
    setActiveShowtime(null); // รีเซ็ตรอบฉายเมื่อเปลี่ยนโรงภาพยนตร์
  };

  const handleDateClick = (date) => {
    setActiveDate(date);
    setActiveShowtime(null); // รีเซ็ตรอบฉายเมื่อเปลี่ยนโรงภาพยนตร์
  };

  const handleShowtimeClick = (showtime) => {
    setActiveShowtime(showtime);
  };

  // ถ้าเข้าลิ้งผิดไปหา movie ที่ไม่มีอยู่จริง
  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-start h-screen text-center px-4 pt-10 sm:pt-20">
        <h1 className="text-4xl font-bold text-primary mb-4">
          No Movie Available
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Please check back later
        </h2>
        <p className="text-gray-600 mb-6">
          This movie is not available at the moment. We’re working to update
          them soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div className="flex flex-col md:flex-row gap-4 px-10">
        {/* Left Section */}
        <section className="flex-2/5 flex flex-col items-center">
          {/* Movie Detail */}
          <h2 className="px-8 py-4 text-center text-[32px] font-bold text-nowrap">
            MOVIE DETAIL
          </h2>

          <div>
            <MovieDetailCard movie={movie} key={movie.id} />
          </div>
        </section>

        {/* Right Section */}
        <section className="flex-3/5 space-y-4 px-2 md:pt-4">
          {/* ถ้าไม่มี showtime จะให้เข้ามาหน้านี้ */}
          {!cinemaFilter.length ? (
            <>
              <div className="flex flex-col items-center justify-start h-screen text-center px-4 pt-10 sm:pt-20">
                <h1 className="text-4xl font-bold text-primary mb-4">
                  No Showtimes Available
                </h1>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Please check back later
                </h2>
                <p className="text-gray-600 mb-6">
                  Showtimes for this movie are not available at the moment.
                  We’re working to update them soon.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Cinema */}
              <div>
                <HeadText text={'CINEMA'} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {cinemaFilter.map((cinema) => (
                    <CinemaSelector
                      name={cinema.name}
                      key={cinema.id}
                      onActive={() => handleCinemaClick(cinema)}
                      isActive={cinema.id === activeCinema?.id}
                    />
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <HeadText text={'DATE'} />
                <DateScroller
                  dates={dates}
                  activeDate={activeDate}
                  onDateSelect={handleDateClick}
                />
              </div>

              {/* Showtime */}
              <div>
                <HeadText text={'SHOWTIME'} />
                {Object.keys(showtimesByScreen).map((screenName) => (
                  <div key={screenName}>
                    <div className="text-lg font-bold">{screenName}</div>
                    <div className="flex flex-wrap gap-2 border-b-1 border-primary/40 pb-2">
                      {showtimesByScreen[screenName].map((showtime) => (
                        <ShowtimeSelector
                          name={dayjs(showtime.datetime).format('HH:mm')}
                          key={showtime.id}
                          onActive={() => handleShowtimeClick(showtime)}
                          isActive={activeShowtime?.id === showtime.id}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Seating */}
              <div>
                <HeadText text={'SEATING'} />
                {activeShowtime && showtimeSeats.length > 0 ? (
                  <Seating seats={showtimeSeats} />
                ) : (
                  <div>Please select a showtime</div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MovieShowtimeDetail;
