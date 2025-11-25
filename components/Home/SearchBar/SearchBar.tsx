import { getHotelLocation } from "@/services/hotelService";

import Formulaire from "@/components/Home/SearchBar/Formulaire";
import { SelectItem } from "@/components/ui/select";
import { getMinMaxRoomPrice } from "@/services/hotelService";
import { getTranslations } from "next-intl/server";

export default async function SearchBar() {
  const t = await getTranslations("SearchBar");
  const location = await getHotelLocation();
  const countriesAvailiable =
    location && location.map((location) => location.country);
  const singletonCountries = [...new Set(countriesAvailiable)].sort();
  const countryOptions = (singletonCountries as string[])?.map((country) => (
    <SelectItem key={country} value={country}>
      {country}
    </SelectItem>
  ));
  const minMaxRoomPrice = await getMinMaxRoomPrice();
  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/20">
        <div className="absolute inset-0 bg-background/30 rounded-2xl backdrop-blur-sm -z-10"></div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
          {t("title")}
        </h2>

        <Formulaire
          maxRoomPrice={minMaxRoomPrice.max}
          minRoomPrice={minMaxRoomPrice.min}
          location={location ? location : []}
          countryOptions={countryOptions}
        />
      </div>
    </div>
  );
}
