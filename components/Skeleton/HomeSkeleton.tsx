"use client";
import { Skeleton } from "@/components/ui/skeleton";
import useGlobalStore from "@/store/Global";
import { Heart, MapPin } from "lucide-react";

export default function HomeSkeleton() {
  const { isViewGrid } = useGlobalStore();
  // On simule plusieurs HotelCards en cours de chargement
  const skeletons = Array.from({ length: 9 });

  return (
    <section
      className={`${
        isViewGrid
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4"
          : "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4"
      } `}
    >
      {skeletons.map((_, index) =>
        isViewGrid ? (
          <GridSkeletonCard key={index} />
        ) : (
          <ListSkeletonCard key={index} />
        ),
      )}
    </section>
  );
}

const GridSkeletonCard = () => {
  return (
    <div className="group relative h-full overflow-hidden bg-card rounded-xl border border-border/40 transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 w-full overflow-hidden">
        <Skeleton className="w-full h-full object-cover" />

        <div className="absolute top-3 right-3 z-10">
          <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
            <Heart className="w-5 h-5 text-muted-foreground/40" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />

        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground/40" />
          <Skeleton className="h-3.5 w-24" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          <Skeleton className="h-6 w-full rounded-full" />
          <Skeleton className="h-6 w-full rounded-full" />
          <Skeleton className="h-6 w-full rounded-full" />
        </div>

        <div className="mt-4 flex justify-end">
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const ListSkeletonCard = () => {
  return (
    <div className="group h-full overflow-hidden bg-card rounded-xl border border-border/40 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-row h-64 relative">
        <div className="relative w-1/3 overflow-hidden">
          <Skeleton className="w-full h-full" />

          <div className="absolute top-3 right-3 z-10">
            <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
              <Heart className="w-5 h-5 text-muted-foreground/40" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className="space-y-2 mb-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground/40" />
            <Skeleton className="h-3.5 w-32" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <div className="mt-auto flex justify-end">
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
