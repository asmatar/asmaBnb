import HotelList from "@/components/HotelList";
import HomeSkeleton from "@/components/Skeleton/HomeSkeleton";
import { Suspense } from "react";

/* import FramerDiv from "@/components/framer/div"; */
export const revalidate = 3600;
export default function Home() {
  return (
    <>
      {/*  <FramerDiv></FramerDiv> */}
      <section>
        <div className="my-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Asma Hotel - Offres exclusives
          </h1>

          <p className="text-lg  mb-6">
            Découvrez une sélection exclusive d’hôtels et de chambres adaptées à
            tous vos besoins et budgets. Notre plateforme vous permet de
            comparer facilement les meilleures offres, de lire les avis des
            voyageurs et de profiter de tarifs imbattables.
          </p>

          <p className="text-lg">
            Avec notre système de réservation simple et sécurisé, trouvez votre
            séjour idéal en quelques clics seulement. Profitez d’une expérience
            utilisateur intuitive, d'un service client disponible 24/7, et
            d’offres exclusives.
          </p>
        </div>
      </section>
      <Suspense fallback={<HomeSkeleton />}>
        <HotelList />
      </Suspense>
    </>
  );
}
