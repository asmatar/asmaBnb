import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Asma Hotel",
    template: "%s | Asma Hotel",
  },
  description: "Display all hotels in the application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(roboto.className)}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <Container>{children}</Container>
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
