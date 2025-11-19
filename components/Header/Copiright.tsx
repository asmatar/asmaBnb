"use client";
import { useTranslations } from "next-intl";

export const Copiright = () => {
  const t = useTranslations("Header");

  return (
    <div className="bg-secondary/80 border-b py-1 text-center text-xs font-medium fixed top-0 left-0 right-0">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
        <span className="gradient-text">
          {t("developer")}
          {"  "}
          <a
            href="mailto:arthur.deruelle@gmail.com"
            className="underline cursor-pointer"
          >
            Deruelle Arthur
          </a>
        </span>
      </div>
    </div>
  );
};

export default Copiright;
