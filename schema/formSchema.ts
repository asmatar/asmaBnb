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
  breakfastPrice: z.coerce.number().optional(),
  bedCount: z.coerce.number().optional(),
  kingBed: z.coerce.number().optional(),
  guestCount: z.coerce.number().optional(),
  queenBed: z.coerce.number().optional(),
  bathroomCount: z.coerce.number(),
  image: z.union([z.instanceof(File), z.string().url()]).refine(
    (val) => {
      if (val instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // Types d'images autorisés
        return allowedTypes.includes(val.type);
      }
      return true;
    },
    {
      message: "File must be a valid image (jpeg, png, gif).",
    },
  ),
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
  title: z.string().min(1, {
    message: "Introduce the name of your hotel.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Hotel description must be at least 10 characters.",
    })
    .max(800, {
      message: "country must be at most 800 characters.",
    }),
  gym: z.boolean(),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  state: z.string(),
  city: z.string(),
  locationDescription: z
    .string()
    .min(10, {
      message: "location description must be at least 10 characters.",
    })
    .max(800, {
      message: "location description must be at most 800 characters.",
    }),
  image: z.union([z.instanceof(File), z.string().url()]).refine(
    (val) => {
      if (val instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // Types d'images autorisés
        return allowedTypes.includes(val.type);
      }
      return true;
    },
    {
      message: "File must be a valid image (jpeg, png, gif).",
    },
  ),
  bar: z.boolean().optional(),
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
