import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { SelectContent, SelectItem } from "../ui/select";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      <SelectContent className="z-[90]">
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur} className="cursor-pointer">
            {t("locale", { locale: cur })}
          </SelectItem>
        ))}
      </SelectContent>
    </LocaleSwitcherSelect>
  );
}
