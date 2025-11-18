"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { useEffect, useState } from "react";
function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // Avoid SSR issues
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
export default ClientThemeProvider;
