import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface GlobalStoreProps {
  isViewGrid: boolean;
  setIsViewGrid: (isViewGrid: boolean) => void;
}

const useGlobalStore = create<GlobalStoreProps>()(
  devtools(
    //persist(
    immer((set) => ({
      isViewGrid: true,
      setIsViewGrid: (isViewGrid) => set({ isViewGrid }),
    })),
    {
      name: "global-storage",
    },
    //),
  ),
);

export default useGlobalStore;
