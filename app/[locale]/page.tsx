import HeroBanner from "@/components/Home/head/HeroBanner";
import HotelList from "@/components/Home/HotelSection/HotelList";
import SearchBar from "@/components/Home/SearchBar/SearchBar";
import HomeSkeleton from "@/components/Skeleton/HomeSkeleton";
import ToggleViewLayout from "@/components/ToggleViewLayout";

import { searchParamsType } from "@/types/search";
import { Suspense } from "react";
export const revalidate = 3600;

export default async function Home({ searchParams }: searchParamsType) {
  const searchParamsUrl = await searchParams;

  return (
    <>
      <HeroBanner />
      <SearchBar />
      <ToggleViewLayout />
      <Suspense fallback={<HomeSkeleton />}>
        <HotelList searchParams={searchParamsUrl} />
      </Suspense>
    </>
  );
}
