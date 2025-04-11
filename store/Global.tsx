import { create } from "zustand";
//import { persist } from "zustand/middleware";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface GlobalStoreProps {
  isViewGrid: boolean;
  setIsViewGrid: (isViewGrid: boolean) => void;
}

const useGlobalStore = create<GlobalStoreProps>()(
  devtools(
    persist(
      immer((set) => ({
        isViewGrid: true,
        setIsViewGrid: (isViewGrid) => set({ isViewGrid }),
      })),
      {
        name: "global-storage", // This is the key in localStorage
      },
    ),
  ),
);

export default useGlobalStore;
