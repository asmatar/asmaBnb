import { getHotelLocation } from "@/services/supabaseApi";

import { SelectItem } from "../ui/select";
import Formulaire from "./Formulaire";

export default async function SearchBar() {
  const location = await getHotelLocation();
  const countriesAvailiable = location.map((location) => location.country);
  const singletonCountries = [...new Set(countriesAvailiable)].sort();
  const countryOptions = (singletonCountries as string[])?.map((country) => (
    <SelectItem key={country} value={country}>
      {country}
    </SelectItem>
  ));

  return (
    <div className="flex w-full max-w-sm items-center border border-gray-300 rounded-lg justify-between">
      <Formulaire location={location} countryOptions={countryOptions} />
    </div>
  );
}
