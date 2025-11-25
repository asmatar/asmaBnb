"use client";

import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "next-intl";

export default function FieldSlider({
  value,
  onValueChange,
  maxRoomPrice,
  minRoomPrice,
}: {
  value: [number, number];
  onValueChange: (value: number[]) => void;
  maxRoomPrice: number;
  minRoomPrice: number;
}) {
  const t = useTranslations("Formulaire");
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldTitle>{t("priceRange")}</FieldTitle>
        <FieldDescription>
          {t("priceRangeDescription")} ($
          <span className="font-medium tabular-nums">{value[0]}</span> -{" "}
          <span className="font-medium tabular-nums">{value[1]}</span>).
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={onValueChange}
          max={maxRoomPrice}
          min={minRoomPrice}
          step={20}
          className="mt-2 w-full"
          aria-label="Price Range"
        />
      </Field>
    </div>
  );
}
