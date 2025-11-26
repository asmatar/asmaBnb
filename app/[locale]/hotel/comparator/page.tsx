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
import { getTranslations } from "next-intl/server";
export const generateMetadata = async () => {
  const t = await getTranslations("Metadata");
  return {
    title: t("HotelComparator.title"),
    description: t("HotelComparator.description"),
  };
};
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const page = async ({
  searchParams,
}: {
  searchParams: { hotel1: string; hotel2: string };
}) => {
  const { hotel1, hotel2 } = await searchParams;
  const hotels = await getSelectedHotels([hotel1, hotel2]);
  console.log("hotels------------------->", hotels);
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
                minPrice={hotel.min_price}
                maxPrice={hotel.max_price}
                gym={hotel.gym}
                id="1"
                isFavorite={false}
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
              <TableHead>Caracteristiques</TableHead>
              <TableHead>Hotel 1</TableHead>
              <TableHead>Hotel 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default page;
