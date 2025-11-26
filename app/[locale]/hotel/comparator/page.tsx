import HotelCard from "@/components/hotel/comparator/HotelCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSelectedHotels } from "@/services/hotelService";
import { Hotel } from "@/types/tableType";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations("Metadata");
  return {
    title: t("HotelComparator.title"),
    description: t("HotelComparator.description"),
  };
};

const page = async ({
  searchParams,
}: {
  searchParams: { hotel1: string; hotel2: string };
}) => {
  const { hotel1, hotel2 } = await searchParams;
  const hotels = await getSelectedHotels([hotel1, hotel2]);
  const t = await getTranslations("Comparator");
  const features = Object.keys(hotels[0]).filter((feature) => {
    const excludeFeatures = [
      "id",
      "title",
      "description",
      "image",
      "created_at",
      "update_at",
      "user_id",
      "locationDescription",
    ];
    return !excludeFeatures.includes(feature);
  });
  return (
    <section className="flex flex-col gap-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hotels.map((hotel) => {
          return (
            <li key={hotel.id}>
              <HotelCard
                key={hotel.id}
                title={hotel.title}
                description={hotel.description}
                image={hotel.image}
                country={hotel.country}
                city={hotel.city ?? ""}
                minPrice={hotel.min_price ?? "NA"}
                maxPrice={hotel.max_price ?? "NA"}
                gym={hotel.gym}
                spa={hotel.spa}
                bar={hotel.bar}
                restaurant={hotel.restaurant}
                freeWifi={hotel.freeWifi}
                freeParking={hotel.freeParking}
                shopping={hotel.shopping}
                swimingPool={hotel.swimingPool}
              />
            </li>
          );
        })}
      </ul>
      <div className="p-4 bg-card rounded-xl border border-border/40">
        <h3 className="text-2xl font-semibold text-accent-gradient">
          Comparaison Detaillée
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-md font-semibold">
                Caracteristiques
              </TableHead>
              {hotels.map((hotel) => (
                <TableHead
                  key={hotel.title}
                  className="text-center text-md font-semibold"
                >
                  {hotel.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature}>
                <TableCell>{t(feature)}</TableCell>
                {hotels.map((hotel) =>
                  typeof hotel[feature as keyof Hotel] === "boolean" ? (
                    <TableCell key={hotel.title} className="text-center">
                      {hotel[feature as keyof Hotel] ? "✅" : "❌"}
                    </TableCell>
                  ) : (
                    <TableCell key={hotel.title} className="text-center">
                      {hotel[feature as keyof Hotel] ?? "NA"}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default page;
