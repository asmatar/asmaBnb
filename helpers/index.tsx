import {
  Bath,
  Car,
  Dumbbell,
  ShoppingBag,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";

export const featuresConfig = {
  swimingPool: { icon: Waves, translationKey: "pool" },
  gym: { icon: Dumbbell, translationKey: "gym" },
  spa: { icon: Bath, translationKey: "spa" },
  bar: { icon: Wine, translationKey: "bar" },
  restaurant: { icon: UtensilsCrossed, translationKey: "restaurant" },
  freeWifi: { icon: Wifi, translationKey: "freeWifi" },
  freeParking: { icon: Car, translationKey: "freeParking" },
  shopping: { icon: ShoppingBag, translationKey: "shopping" },
} as const;
