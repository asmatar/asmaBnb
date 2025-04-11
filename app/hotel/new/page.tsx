import AddHotelForm from "@/components/AddHotelForm";
import { getAllCountries } from "@/services/locationService";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ajouter un nouvel hôtel",
  description:
    "Créez et configurez un nouvel hôtel pour votre établissement. Ajoutez des informations détaillées et des caractéristiques pour attirer les clients.",
};

async function HotelNew() {
  const countries = await getAllCountries();
  return (
    <section>
      <AddHotelForm countries={countries} />
    </section>
  );
}

export default HotelNew;
