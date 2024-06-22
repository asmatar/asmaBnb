"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

/* import logoDark from "/logo-dark.png";
import logoLight from "/logo-light.png"; */

export function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      /* src="/logo-light.png" */
      src={`${theme === "light" ? "/logo-dark.png" : "/logo-light.png"}`}
      alt="Logo"
      width={100}
      height={100}
    ></Image>
  );
}
