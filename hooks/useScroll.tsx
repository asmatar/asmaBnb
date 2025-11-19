import useGlobalStore from "@/store/Global";
import { useEffect } from "react";

const useScroll = () => {
  const { small, setSmall } = useGlobalStore();
  useEffect(() => {
    window.addEventListener("scroll", () => setSmall(window.pageYOffset > 50));
    return () =>
      window.removeEventListener("scroll", () =>
        setSmall(window.pageYOffset > 20),
      );
  }, [small, setSmall]);
  return { small };
};

export default useScroll;
