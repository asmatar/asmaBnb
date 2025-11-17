import RoomCard from "@/components/RoomCard";
import { Card } from "@/components/ui/card";
import { getOneRoomInBooking } from "@/services/roomService";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import StripePayment from "./StripePayment";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const t = await getTranslations("Metadata");
  const room = await getOneRoomInBooking(id);
  return {
    title: `${t("checkout.title")} - ${room?.[0]?.roomTitle}`,
    description: `${t("checkout.description")}`,
  };
};
const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const room = await getOneRoomInBooking(id);
  const t = await getTranslations("Checkout");
  if (!room || room.length === 0) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
            <div className="space-y-6">
              <Card className="p-6 border-primary/10">
                <h2 className="text-xl font-semibold mb-4">
                  {t("roomDetails")}
                </h2>
                <RoomCard room={room[0]} />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-primary/10">
                <h2 className="text-xl font-semibold mb-4">
                  {t("paymentInformation")}
                </h2>
                <StripePayment
                  id={id}
                  startDate={room[0].startDate}
                  endDate={room[0].endDate}
                  totalPrice={room[0].totalPrice}
                  breakfastPrice={room[0].breakfastPrice}
                  breakfastIncluded={room[0].breakfastIncluded}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
