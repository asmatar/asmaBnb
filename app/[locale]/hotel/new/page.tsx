import AddHotelForm from "@/components/AddHotelForm";
import { getAllCountries } from "@/services/locationService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: `${t("hotelNew.title")}`,
    description: `${t("hotelNew.description")}`,
  };
}

async function HotelNew() {
  const countries = await getAllCountries();
  return (
    <section>
      <AddHotelForm countries={countries} />
    </section>
  );
}

export default HotelNew;
