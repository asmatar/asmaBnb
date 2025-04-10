"use client";
import useGlobalStore from "@/store/Global";
function StyleContainer({ children }: { children: React.ReactNode }) {
  const { isViewGrid } = useGlobalStore();
  return (
    <section
      className={`${
        isViewGrid
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4"
          : "flex flex-col gap-4"
      } `}
    >
      {children}
    </section>
  );
}
export default StyleContainer;
