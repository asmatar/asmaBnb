// app/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"; // Remplacez cela par le bon chemin de Skeleton selon votre setup

export default function HomeSkeleton() {
  // On simule trois HotelCards en cours de chargement pour l'exemple
  const skeletons = Array.from({ length: 9 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {skeletons.map((_, index) => (
        <SkeletonHotelCard key={index} />
      ))}
    </div>
  );
}

const SkeletonHotelCard = () => {
  return (
    <div className="col-span-1 cursor-pointer transition hover:scale-105">
      <div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
        <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
          <Skeleton className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex flex-col gap-1 mt-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
};
