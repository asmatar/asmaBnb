import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface GlobalStoreProps {
  isViewGrid: boolean;
  setIsViewGrid: (isViewGrid: boolean) => void;
  small: boolean;
  setSmall: (small: boolean) => void;
  comparator: string[];
  setComparator: (hotelId: string) => void;
}

const useGlobalStore = create<GlobalStoreProps>()(
  devtools(
    persist(
      immer((set) => ({
        small: false,
        setSmall: (small) => set({ small }),
        isViewGrid: true,
        setIsViewGrid: (isViewGrid) => set({ isViewGrid }),
        comparator: [],
        setComparator: (hotelId) => {
          set((state) => {
            if (
              state.comparator.length === 2 &&
              !state.comparator.includes(hotelId)
            ) {
              toast.error("You can only compare 2 hotels at a time");
              return;
            }
            if (state.comparator.includes(hotelId)) {
              return {
                comparator: state.comparator.filter((item) => item !== hotelId),
              };
            } else {
              state.comparator.push(hotelId);
            }
          });
        },
      })),
      {
        name: "global-storage",
      },
    ),
  ),
);

export default useGlobalStore;
