import ClientThemeProvider from "@/components/ClientThemeProvider";
import Header from "@/components/Header";
import Container from "@/components/ui/Container";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Roboto } from "next/font/google";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Asma Hotel",
    template: "%s | Asma Hotel",
  },
  description:
    "Découvrez Asma Hotel, votre destination de luxe pour des séjours inoubliables. Profitez de nos chambres élégantes, installations modernes et service exceptionnel pour une expérience hôtelière parfaite.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <ClerkProvider
      signInUrl={`/${locale}/sign-in`}
      signUpUrl={`/${locale}/sign-up`}
      localization={{
        locale: locale,
      }}
    >
      <html lang={locale} suppressHydrationWarning>
        <body className={cn(roboto.className)}>
          <NextIntlClientProvider>
            <ClientThemeProvider>
              <Header />
              <Container>{children}</Container>
              <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                limit={3}
              />
            </ClientThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
