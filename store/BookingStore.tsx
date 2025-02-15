import { create } from "zustand";
//import { persist } from "zustand/middleware";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
export type bookings = {
  //id: string;
  username: string | null;
  user_email: string;
  user_id: string;
  roomBooked: string;
  hotelBooked: string;
  hotelOwnerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  currency: string;
  paymentStatus: string;
  paymentIntentId: string;
  breakfastIncluded: boolean;
};

interface BookingStoreProps {
  bookings: bookings[];
  paymentStatus: string;
  clientSecret: string;
  addBooking: (newBooking: bookings) => void;
  setClientSecret: (clientSecret: string) => void;
  setPaymentStatus: (paymentstatus: string) => void;
}

const useBookingStore = create<BookingStoreProps>()(
  persist(
    immer(
      devtools((set) => ({
        bookings: [],
        paymentStatus: "",
        clientSecret: "",

        addBooking: (newBooking) =>
          set((state) => {
            state.bookings.push(newBooking);
          }),

        setClientSecret: (payload) =>
          set((state) => {
            state.clientSecret = payload;
          }),

        setPaymentStatus: (payload) =>
          set((state) => {
            state.paymentStatus = payload;
          }),
      })),
    ),
    {
      name: "booking-storage", // This is the key in localStorage
    },
  ),
);

export default useBookingStore;
