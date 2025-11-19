"use client";

import congrat from "@/app/assets/lotties/congrat.json";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie-player";
import { useTranslations } from "next-intl";

export default function ThankYouContent() {
  const t = useTranslations("ThankYou");
  const router = useRouter();

  return (
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
  );
}

