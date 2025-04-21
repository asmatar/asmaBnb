"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import congrat from "../assets/lotties/congrat.json";
function BookedPage() {
  const router = useRouter();
  const t = useTranslations("ThankYou");

  return (
    <div className="min-h-[80vh] flex items-center justify-center  ">
      <div className="p-8 rounded-lg shadow-xl text-center bg-popover">
        <Lottie loop animationData={congrat} play style={{ width: 350 }} />

        <h1 className="text-2xl font-bold mt-4 mb-6 ">{t("title")}</h1>
        <div className="flex flex-col space-y-3">
          <Button className="w-full" onClick={() => router.push("/")}>
            {t("backToHome")}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/my-bookings")}
          >
            {t("seeMyBookings")}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default BookedPage;
