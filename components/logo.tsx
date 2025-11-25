"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function Logo() {
  const { theme } = useTheme();
  return (
    <div className="relative w-28 h-16">
      <Image
        fill
        src={`${theme !== "dark" ? "/logo-light.png" : "/logo-dark.png"}`}
        alt="Logo"
      ></Image>
    </div>
  );
}
