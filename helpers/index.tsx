import {
  Bath,
  Bike,
  Car,
  Clapperboard,
  Dumbbell,
  ShoppingBag,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import { MdLocalLaundryService } from "react-icons/md";

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

export const featuresConfigSidebar = {
  swimingPool: { icon: Waves, translationKey: "swimingPool" },
  gym: { icon: Dumbbell, translationKey: "gym" },
  spa: { icon: Bath, translationKey: "spa" },
  bar: { icon: Wine, translationKey: "bar" },
  restaurant: { icon: UtensilsCrossed, translationKey: "restaurant" },
  freeWifi: { icon: Wifi, translationKey: "freeWifi" },
  freeParking: { icon: Car, translationKey: "freeParking" },
  shopping: { icon: ShoppingBag, translationKey: "shopping" },
  bikeRental: { icon: Bike, translationKey: "bikeRental" },
  laundry: { icon: MdLocalLaundryService, translationKey: "laundry" },
  movieNights: { icon: Clapperboard, translationKey: "movieNights" },
  coffeeShop: { icon: Wine, translationKey: "coffeeShop" },
} as const;
