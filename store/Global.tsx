import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface GlobalStoreProps {
  isViewGrid: boolean;
  setIsViewGrid: (isViewGrid: boolean) => void;
  small: boolean;
  setSmall: (small: boolean) => void;
}

const useGlobalStore = create<GlobalStoreProps>()(
  devtools(
    persist(
      immer((set) => ({
        small: false,
        setSmall: (small) => set({ small }),
        isViewGrid: true,
        setIsViewGrid: (isViewGrid) => set({ isViewGrid }),
      })),
      {
        name: "global-storage",
      },
    ),
  ),
);

export default useGlobalStore;
