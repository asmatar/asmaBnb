import BookingTabs from "@/components/myBookings/BookingTabs";
import { Suspense } from "react";
import Loading from "./loading";

const page = async () => {
  return (
    <section className="container max-w-screen-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-accent-gradient">My Bookings</span>
        </h1>
        <Suspense fallback={<Loading />}>
          <BookingTabs />
        </Suspense>
      </div>
    </section>
  );
};

export default page;
