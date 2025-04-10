import { Room } from "./tableType";

export type HotelCardProps = {
  title: string;
  description: string;
  image: string;
  /*   price: number; */
  country: string;
  city: string;
  gym: boolean;
  pool: boolean;
  id: string;
  isFavorite: boolean;
};
export type RoomBooked = Room & {
  endDate: string;
  startDate: string;
  booking: {
    id: string;
    user_id: string;
    roomBooked: string;
    hotelBooked: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    breakfastIncluded: boolean;
    isPaid: boolean;
    paymentIntentId: string;
    created_at: string;
  }[];
  id: string;
  user_id: string;
  roomBooked: string;
  hotelBooked: string;
  paymentIntentId: string;
  totalPrice: number;
  breakfastIncluded: boolean;
  isPaid: boolean;
  created_at: string;
  paymentStatus: string;
  username: string;
};
