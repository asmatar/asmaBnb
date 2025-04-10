import { useEffect, useState } from "react";

const useCounter = (maximum: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const maxCount = maximum;
    const interval = setInterval(() => {
      if (count >= maxCount) {
        clearInterval(interval);
        return;
      }
      setCount((prev) => prev + 1);
    }, 60);
    return () => clearInterval(interval);
  }, [count, maximum]);
  return { count };
};

export default useCounter;
