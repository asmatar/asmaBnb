import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[350px] md:h-[600px] rounded-lg">
        <Skeleton className="w-full h-full rounded-lg bg-gray-200 animate-pulse" />
      </div>

      <section className="mb-8">
        <Skeleton className="h-8 w-1/4 rounded-md bg-gray-200 animate-pulse" />

        <div className="font-semibold mt-4 flex items-center gap-1 w-1/4">
          <Skeleton className="h-4 w-6 rounded-full bg-gray-200 animate-pulse" />
          <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200 animate-pulse" />
        </div>

        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details</h3>
        <Skeleton className="h-6 w-full mb-2 rounded-md bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-11/12 mb-2 rounded-md bg-gray-200 animate-pulse" />

        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <Skeleton className="h-6 w-full mb-2 rounded-md bg-gray-200 animate-pulse" />
        <Skeleton className="h-6 w-10/12 mb-2 rounded-md bg-gray-200 animate-pulse" />

        <h3 className="font-semibold text-lg mt-4 mb-2">Popular amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div className="flex items-center gap-1" key={index}>
              <Skeleton className="h-4 w-6 rounded-full bg-gray-200 animate-pulse" />
              <Skeleton className="h-4 w-1/4 rounded-md bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold my-4">Rooms available</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow-md"
            >
              <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 animate-pulse" />
              <Skeleton className="h-3 w-full rounded-md bg-gray-200 animate-pulse" />
              <Skeleton className="h-3 w-full rounded-md bg-gray-200 animate-pulse" />
              <Skeleton className="h-3 w-full rounded-md bg-gray-200 animate-pulse" />

              <Skeleton className="h-52 w-full rounded-lg bg-gray-200 animate-pulse" />

              <div className="flex gap-28">
                <Skeleton className="h-3 w-1/6 rounded-md bg-gray-200 animate-pulse" />
                <Skeleton className="h-3 w-1/6 rounded-md bg-gray-200 animate-pulse" />
              </div>
              <div className="flex gap-28">
                <Skeleton className="h-3 w-1/6 rounded-md bg-gray-200 animate-pulse" />
                <Skeleton className="h-3 w-1/6 rounded-md bg-gray-200 animate-pulse" />
              </div>
              <div className="flex gap-28">
                <Skeleton className="h-3 w-1/6 rounded-md bg-gray-200 animate-pulse" />
                <Skeleton className="h-3 w-1/6 rounded-md bg-gray-200 animate-pulse" />
              </div>

              <Skeleton className="h-1 w-full rounded-md bg-gray-200 animate-pulse" />

              <div className="grid grid-cols-2 gap-4 content-start text-sm">
                {[...Array(2)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-6 w-3/4 rounded-md bg-gray-200 animate-pulse"
                  />
                ))}
              </div>

              <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
