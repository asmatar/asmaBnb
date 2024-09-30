import { Skeleton } from "@/components/ui/skeleton";

export default function HotelSkeleton() {
  return (
    <section className="flex flex-col gap-6 pb-2">
      {/* Skeleton for Hotel Image */}
      <div className="aspect-square overflow-hidden relative w-full h-[350px] md:h-[600px] rounded-lg">
        <Skeleton className="w-full h-full rounded-lg animate-pulse bg-gray-300" />
      </div>

      {/* Skeleton for Hotel Title and Location */}
      <section className="mb-8">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-3/4 rounded-md bg-gray-300 animate-pulse" />

        {/* Location Skeleton */}
        <div className="font-semibold mt-4">
          <Skeleton className="h-4 w-1/2 rounded-md bg-gray-300 animate-pulse" />
        </div>

        {/* Section Details */}
        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details</h3>
        <Skeleton className="h-6 w-full mb-2 rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-6 w-11/12 mb-2 rounded-md bg-gray-300 animate-pulse" />

        {/* About Section */}
        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel</h3>
        <Skeleton className="h-6 w-full mb-2 rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-6 w-10/12 mb-2 rounded-md bg-gray-300 animate-pulse" />

        {/* Popular Amenities */}
        <h3 className="font-semibold text-lg mt-4 mb-2">Popular amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Amenities Skeletons */}
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-6 w-3/4 rounded-md bg-gray-300 animate-pulse"
            />
          ))}
        </div>
      </section>

      {/* Skeleton for Rooms */}
      <section>
        <h2 className="text-xl font-semibold my-4">Rooms available</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Skeletons for Room Cards */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow-md"
            >
              <Skeleton className="h-32 w-full rounded-lg bg-gray-300 animate-pulse" />
              <Skeleton className="h-6 w-3/4 rounded-md bg-gray-300 animate-pulse" />
              <Skeleton className="h-4 w-1/2 rounded-md bg-gray-300 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
