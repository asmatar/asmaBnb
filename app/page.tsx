/* import FramerDiv from "@/components/framer/div"; */

import HotelList from "@/components/HotelList";
import SearchBar from "@/components/SearchBar/SearchBar";
import HomeSkeleton from "@/components/Skeleton/HomeSkeleton";

import { Suspense } from "react";

export const revalidate = 3600;
export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <>
      {/*  <FramerDiv></FramerDiv> */}
      <section>
        <div className="my-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Asma Hotel - Offres exclusives
          </h1>

          <p className="text-lg  mb-6">
            Découvrez une sélection exclusive dhôtels et de chambres adaptées à
            tous vos besoins et budgets. Notre plateforme vous permet de
            comparer facilement les meilleures offres, de lire les avis des
            voyageurs et de profiter de tarifs imbattables.
          </p>

          <p className="text-lg">
            Avec notre système de réservation simple et sécurisé, trouvez votre
            séjour idéal en quelques clics seulement. Profitez d&apos; une
            expérience utilisateur intuitive, d&apos;un service client
            disponible 24/7, et d&apos;offres exclusives.
          </p>
        </div>
      </section>
      <SearchBar />
      <Suspense fallback={<HomeSkeleton />}>
        <HotelList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
