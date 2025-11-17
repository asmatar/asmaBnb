import { Booking, Room } from "./tableType";

export type RoomBooked = Room & {
  // Propriétés de Booking (fusionnées)
  booked_At: string;
  breakfastIncluded: boolean;
  clientSecret: string;
  currency: string;
  endDate: string;
  startDate: string;
  hotelBooked: string;
  hotelOwnerId: string;
  paymentIntentId: string;
  paymentStatus: string;
  roomBooked: string;
  totalPrice: number;
  user_email: string;
  username: string;
};

export type RoomCardProps = (Room & { booking?: Booking[] }) | RoomBooked;
