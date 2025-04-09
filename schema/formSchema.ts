import { z } from "zod";

export const roomSchema = z.object({
  roomTitle: z.string().min(1, {
    message: "Room title is required.",
  }),
  roomDescription: z
    .string()
    .min(10, {
      message: "Room description must be at least 10 characters.",
    })
    .max(800, {
      message: "Room description must be at most 800 characters.",
    }),
  roomPrice: z.coerce.number().refine((val) => val > 0, {
    message: "Room price must be greater than 0",
  }),
  breakfastPrice: z.coerce.number(),
  bedCount: z.coerce.number().nullable().optional(),
  kingBed: z.coerce.number().nullable().optional(),
  guestCount: z.coerce.number().nullable().optional(),
  queenBed: z.coerce.number().nullable().optional(),
  bathroomCount: z.coerce.number().nullable().optional(),
  image: z.union([z.instanceof(File), z.string()]).refine(
    (val) => {
      if (val instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        return allowedTypes.includes(val.type);
      }
      return true;
    },
    {
      message: "File must be a valid image (jpeg, png, jpg).",
    },
  ),
  roomService: z.boolean().default(false),
  TV: z.boolean().default(false),
  balcony: z.boolean().default(false),
  freeWifi: z.boolean().default(false),
  cityView: z.boolean().default(false),
  oceanView: z.boolean().default(false),
  forestView: z.boolean().default(false),
  mountainView: z.boolean().default(false),
  airCondition: z.boolean().default(false),
  soundProofed: z.boolean().default(false),
});

export const hotelSchema = z.object({
  title: z.string().min(1, {
    message: "Introduce the name of your hotel.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Hotel description must be at least 10 characters.",
    })
    .max(800, {
      message: "Description must be at most 800 characters.",
    }),
  image: z.union([z.instanceof(File), z.string()]).refine(
    (val) => {
      if (val instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        return allowedTypes.includes(val.type);
      }
      return true;
    },
    {
      message: "File must be a valid image (jpeg, png, jpg).",
    },
  ),
  gym: z.boolean().default(false),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  state: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  locationDescription: z
    .string()
    .min(10, {
      message: "Location description must be at least 10 characters.",
    })
    .max(800, {
      message: "Location description must be at most 800 characters.",
    }),
  bar: z.boolean().default(false).optional(),
  bikeRental: z.boolean().default(false).optional(),
  freeParking: z.boolean().default(false).optional(),
  freeWifi: z.boolean().default(false).optional(),
  laundry: z.boolean().default(false).optional(),
  movieNights: z.boolean().default(false).optional(),
  restaurant: z.boolean().default(false).optional(),
  shopping: z.boolean().default(false).optional(),
  spa: z.boolean().default(false).optional(),
  coffeeShop: z.boolean().default(false).optional(),
  swimingPool: z.boolean().default(false).optional(),
});
