import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCinemas } from '@/api/Cinema';
import { getScreens } from '@/api/Screen';
import { getMovies } from '@/api/Movie';
import { getAllShowtime } from '@/api/Showtime';
import { getShowtimeSeats } from '@/api/ShowtimeSeat';
import { login } from '@/api/auth';

const store = (set) => ({
  user: null,
  token: null,
  cinemaList: [],
  screenList: [],
  movieList: [],
  showtimeList: [],
  showtimeSeats: [],
  selectedSeats: [],
  login: async (data) => {
    const res = await login(data);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  logout: () => {
    set({
      user: null,
      token: null,
    });
  },
  fetchCinemas: async () => {
    try {
      const res = await getCinemas();
      set({ cinemaList: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchScreens: async () => {
    try {
      const res = await getScreens();
      set({ screenList: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchMovies: async () => {
    try {
      const res = await getMovies();
      set({ movieList: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchShowtimes: async () => {
    try {
      const res = await getAllShowtime();
      set({ showtimeList: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchShowtimeSeats: async (showtime_id) => {
    try {
      const res = await getShowtimeSeats(showtime_id);
      set({ showtimeSeats: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  // Action to toggle a seat
  toggleSeat: (seat) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.some(
        (selected) => selected.id === seat.id
      )
        ? state.selectedSeats.filter((selected) => selected.id !== seat.id)
        : [...state.selectedSeats, seat],
    })),
  // Action to reset selected seats
  resetSelectedSeats: () => set({ selectedSeats: [] }),
});

const useStore = create(
  persist(store, {
    name: 'store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      user: state.user,
      token: state.token,
    }),
  })
);

export default useStore;
