import { getTranslations } from "next-intl/server";

export const Copiright = async () => {
  const t = await getTranslations("Header");
  return (
    <div className="bg-secondary/80 border-b py-1 text-center text-xs font-medium">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6">
        <span className="gradient-text">
          {t("developer")}
          {"  "} Deruelle Arthur
        </span>
      </div>
    </div>
  );
};

export default Copiright;
