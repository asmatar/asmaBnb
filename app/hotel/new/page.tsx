import AddHotelForm from "@/components/AddHotelForm";
import { getAllCountries } from "@/services/Location";

async function HotelNew() {
  const countries = await getAllCountries();
  return (
    <section>
      <AddHotelForm countries={countries} />
    </section>
  );
}

export default HotelNew;
