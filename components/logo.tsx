"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

/* import logoDark from "/logo-dark.png";
import logoLight from "/logo-light.png"; */

export function Logo() {
  const { theme } = useTheme();

  return (
    <div className="relative w-28 h-16">
      <Image
        /* src="/logo-light.png" */
        fill
        src={`${theme === "light" ? "/logo-light.png" : "/logo-light.png"}`}
        alt="Logo"
        /*      width={100}
      height={100} */
      ></Image>
    </div>
  );
}
