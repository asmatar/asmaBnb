import { getHotelLocation } from "@/services/hotelService";

import Formulaire from "@/components/Home/SearchBar/Formulaire";
import { SelectItem } from "@/components/ui/select";

export default async function SearchBar() {
  const location = await getHotelLocation();
  const countriesAvailiable =
    location && location.map((location) => location.country);
  const singletonCountries = [...new Set(countriesAvailiable)].sort();
  const countryOptions = (singletonCountries as string[])?.map((country) => (
    <SelectItem key={country} value={country}>
      {country}
    </SelectItem>
  ));

  return (
    <div className="flex flex-col w-full  items-center  justify-end gap-6 mb-16 ">
      <p className="">Search Your best Hotel</p>
      <Formulaire location={location} countryOptions={countryOptions} />
    </div>
  );
}
