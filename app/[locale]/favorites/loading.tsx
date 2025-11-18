import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MapPin } from "lucide-react";

const loading = () => {
  return (
    <>
      {/* Banner Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 mb-8 w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left w-full">
              <div className="flex items-center justify-center md:justify-between gap-2">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-8 w-48" />
                </div>
                <Skeleton className="h-7 w-32 rounded-full" />
              </div>
              <Skeleton className="h-5 w-96 max-w-md mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Hotels Grid Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="group relative h-full overflow-hidden bg-card rounded-xl border border-border/40 transition-all duration-300 hover:shadow-lg"
          >
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
        ))}
      </section>
    </>
  );
};

export default loading;
