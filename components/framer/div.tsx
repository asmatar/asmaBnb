"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";
const FramerDiv = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async () => {
      await animate(
        scope.current,
        { left: "0vw", opacity: 1 },
        { duration: 1.3 },
      );
      await animate("h1", { y: -50, opacity: 1 }, { duration: 0.5 });
      await animate(
        "h2",
        { y: -50, opacity: 1 },
        { duration: 0.5, delay: 0.2 },
      );
      await animate("h3", { y: -50, opacity: 1 }, { duration: 0.5 });
      await animate("h3", { y: 0, opacity: 0 }, { duration: 0.5, delay: 0.5 });
      await animate("h2", { y: 0, opacity: 0 }, { duration: 0.5 });
      await animate("h1", { y: 0, opacity: 0 }, { duration: 0.5 });
      await animate(
        scope.current,
        { left: "-100vw", opacity: 1 },
        { duration: 1.3, delay: 0.2 },
      );
    };
    enterAnimation();
  }, []);
  return (
    <div
      ref={scope}
      className="w-full h-screen absolute top-0  bg-gray-50 flex -left-[100vw] flex-col gap-10 z-10 tracking-tight py-14"
    >
      <h1 className="text-8xl font-bold opacity-0 ">WELCOME</h1>
      <h2 className="text-8xl font-bold opacity-0">ASMA HOTEL</h2>
      <h3 className="text-8xl font-bold opacity-0 ">BOOK YOUR BEST HOTEL</h3>
    </div>
  );
};

export default FramerDiv;
