import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-8 w-full mx-auto animate-pulse">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-background rounded-lg p-8 border flex flex-col items-center justify-center space-y-4"
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-background rounded-lg shadow-sm p-2 mb-6">
        <div className="w-full mb-8 grid grid-cols-2 p-1 bg-muted/30">
          {[1, 2].map((index) => (
            <div key={index} className="py-4 flex justify-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="bg-card p-8 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-px w-full mb-8" />

          {/* Room Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-8 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
