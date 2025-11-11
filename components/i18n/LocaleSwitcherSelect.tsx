"use client";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import clsx from "clsx";
import { Locale } from "next-intl";
import { useParams } from "next/navigation";
import { ReactNode, useTransition } from "react";
type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <p className="sr-only">{label}</p>
      <div className="inline-flex appearance-none bg-transparent">
        <Select
          defaultValue={defaultValue}
          disabled={isPending}
          onValueChange={onSelectChange}
        >
          <SelectTrigger className="w-[180px] cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          {children}
        </Select>
      </div>
    </label>
  );
}
