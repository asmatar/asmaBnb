"use client";
import useGlobalStore from "@/store/Global";
function HotelViewStyleContainer({ children }: { children: React.ReactNode }) {
  const { isViewGrid } = useGlobalStore();
  return (
    <section
      className={`${
        isViewGrid
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 xl:gap-x-8 xl:gap-y-12 mt-4"
          : "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4"
      } `}
    >
      {children}
    </section>
  );
}
export default HotelViewStyleContainer;
