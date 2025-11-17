import MyBookings from "@/components/myBookings/MyBookings";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Loading from "./loading";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("myBookings.title"),
    description: t("myBookings.description"),
  };
}

const page = async () => {
  const t = await getTranslations("MyBookings");
  return (
    <section className="container max-w-screen-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-accent-gradient">{t("myBookings")}</span>
        </h1>
        <Suspense fallback={<Loading />}>
          <MyBookings />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
