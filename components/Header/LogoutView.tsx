import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";
import { ModeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { FaRegUser } from "react-icons/fa6";

export const LogoutView = async () => {
  const t = await getTranslations("Header");
  const locale = await getLocale();
  return (
    <div className="flex items-center gap-2">
      <LocaleSwitcher />
      <ModeToggle />
      <Separator orientation="vertical" className="h-6" />
      <Link href={`/${locale}/sign-in`}>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
          <FaRegUser className="h-3 w-3" />
          <span>{t("signIn")}</span>
        </Button>
      </Link>
      <Link href={`/${locale}/sign-up`}>
        <Button variant="gradient" size="sm" className="shadow-sm">
          {t("joinNow")}
        </Button>
      </Link>
    </div>
  );
};
