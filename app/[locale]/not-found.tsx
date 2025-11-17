import { Button } from "@/components/ui/button";
import { Hotel, Search } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const locale = await getLocale();
  return (
    <section
      className="absolute right-0 left-0 top-0 flex flex-col items-center justify-center h-screen bg-cover bg-center text-center  animate-fade-in"
      style={{ backgroundImage: "url('/not-found.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-lg text-white">
        <Hotel className="w-24 h-24 text-white mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold mb-4 animate-slide-up">
          {t("title")}
        </h1>
        <p className="text-lg mb-6 animate-fade-in">{t("description")}</p>
        <Link href={`/${locale}`} passHref>
          <Button className="bg-white text-black hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg animate-pulse">
            <Search className="mr-2 w-5 h-5" />
            {t("backToHome")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
