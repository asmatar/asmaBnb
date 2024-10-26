import { z } from "zod";

export const roomSchema = z.object({
  roomTitle: z.string().min(2, {
    message: "room title must be at least 2 characters.",
  }),
  roomDescription: z.string().min(2, {
    message: "room description must be at least 2 characters.",
  }),
  roomPrice: z.coerce.number().optional(),
  breakfastPrice: z.coerce.number().optional(),
  bedCount: z.coerce.number().optional(),
  kingBed: z.coerce.number().optional(),
  guestCount: z.coerce.number().optional(),
  queenBed: z.coerce.number().optional(),
  bathroomCount: z.coerce.number(),
  image: z.union([z.instanceof(File), z.string()]),
  roomService: z.boolean(),
  TV: z.boolean(),
  balcony: z.boolean(),
  freeWifi: z.boolean(),
  cityView: z.boolean(),
  oceanView: z.boolean(),
  forestView: z.boolean(),
  mountainView: z.boolean(),
  airCondition: z.boolean(),
  soundProofed: z.boolean(),
});

export const hotelSchema = z.object({
  title: z.string().min(2, {
    message: "Hotel title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Hotel title must be at least 2 characters.",
  }),
  gym: z.boolean(),
  country: z.string().min(2, {
    message: "Please select a country.",
  }),
  state: z.string(),
  city: z.string(),
  /*   locationDescription: z.string().min(10, {
    message: "location description must be at least 10 characters.",
  }), */
  locationDescription: z.string(),
  image: z.union([z.instanceof(File), z.string()]),
  bar: z.boolean().optional().optional(),
  bikeRental: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  laundry: z.boolean().optional(),
  movieNights: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shopping: z.boolean().optional(),
  spa: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
  swimingPool: z.boolean().optional(),
});
