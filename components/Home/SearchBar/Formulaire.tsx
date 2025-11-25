"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bath,
  Car,
  Dumbbell,
  RotateCcw,
  Search,
  Store,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FieldSlider from "./FieldSlider";
import { FilterCheckbox } from "./FilterCheckbox";
import { LocationFields } from "./LocationFields";

type FormProps = {
  countryOptions: JSX.Element[];
  location: {
    country: string | null;
    state: string | null;
    city: string | null;
  }[];
  maxRoomPrice: number;
  minRoomPrice: number;
};
export const searchHotelSchema = z.object({
  price: z.number().array().optional(),
  title: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  spa: z.boolean().optional(),
  gym: z.boolean().optional(),
  bar: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  shopping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  swimingPool: z.boolean().optional(),
});

export type SearchHotelFormValues = z.infer<typeof searchHotelSchema>;

export default function Formulaire({
  location,
  countryOptions,
  maxRoomPrice,
  minRoomPrice,
}: FormProps) {
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const t = useTranslations("Formulaire");
  const form = useForm<SearchHotelFormValues>({
    resolver: zodResolver(searchHotelSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      title: "",
      country: "",
      state: "",
      city: "",
      spa: false,
      gym: false,
      bar: false,
      restaurant: false,
      freeWifi: false,
      shopping: false,
      freeParking: false,
      swimingPool: false,
      price: [minRoomPrice, maxRoomPrice],
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const cleanForm = () => {
    form.reset();
    setFilteredStates([]);
    setFilteredCities([]);
    router.push(pathname);
  };

  async function onSubmit(values: SearchHotelFormValues) {
    const formatedValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (key === "gym" && value !== true) return acc;
        if (key === "bar" && value !== true) return acc;
        if (key === "restaurant" && value !== true) return acc;
        if (key === "freeWifi" && value !== true) return acc;
        if (key === "shopping" && value !== true) return acc;
        if (key === "freeParking" && value !== true) return acc;
        if (key === "swimingPool" && value !== true) return acc;
        if (key === "spa" && value !== true) return acc;
        if (
          key === "price" &&
          Array.isArray(value) &&
          value.length === 2 &&
          (value[0] !== 50 || value[1] !== 300)
        ) {
          return {
            ...acc,
            minPrice: value[0].toString(),
            maxPrice: value[1].toString(),
          };
        }
        if (value !== undefined && value !== "") {
          if (Array.isArray(value)) return acc;
          acc[key] = typeof value === "boolean" ? String(value) : value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    const query = new URLSearchParams(formatedValues).toString();
    router.replace(`?${query}`);
  }

  const getFilteredStates = (value: string) => {
    const filteredStatesDuplicate = location
      .filter((location) => location.country === value)
      .map((location) => location.state);

    const filteredStates = [...new Set(filteredStatesDuplicate)];
    if (form.getValues("state") !== "") {
      form.resetField("state");
    }
    if (form.getValues("city") !== "") {
      form.resetField("city");
    }
    setFilteredStates(filteredStates as string[]);
  };

  const getFilteredCities = (value: string) => {
    const filteredCitiesDuplicate = location
      .filter((location) => location.state === value)
      .map((location) => location.city);

    const filteredCities = [...new Set(filteredCitiesDuplicate)];

    if (form.getValues("city") !== "") {
      form.resetField("city");
    }
    setFilteredCities(filteredCities as string[]);
  };
  const statesOptions = filteredStates?.map((states) => (
    <SelectItem key={states} value={states}>
      {states}
    </SelectItem>
  ));
  const citiesOptions = filteredCities?.map((city) => (
    <SelectItem key={city} value={city}>
      {city}
    </SelectItem>
  ));
  const activeFilters = [
    form.getValues("spa"),
    form.getValues("gym"),
    form.getValues("bar"),
    form.getValues("restaurant"),
    form.getValues("freeWifi"),
    form.getValues("shopping"),
    form.getValues("freeParking"),
    form.getValues("swimingPool"),
  ].filter(Boolean).length;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 relative">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    title="Search hotel"
                    type="search"
                    {...field}
                    placeholder={t("searchHotel")}
                    className="pl-10 border-none bg-background/80 shadow-sm backdrop-blur-sm h-11"
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                  />
                </div>
              )}
            />
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <LocationFields
              control={form.control}
              name="country"
              placeholder={t("selectCountry")}
              filteredFunction={getFilteredStates}
              optionsFields={countryOptions}
            />
            <LocationFields
              control={form.control}
              name="state"
              placeholder={t("selectState")}
              disabled={form.getValues("country") === "" ? true : false}
              filteredFunction={getFilteredCities}
              optionsFields={statesOptions}
            />
            <LocationFields
              control={form.control}
              name="city"
              placeholder={t("selectCity")}
              disabled={form.getValues("state") === "" ? true : false}
              optionsFields={citiesOptions}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FieldSlider
                  onValueChange={(price) => {
                    field.onChange(price);
                  }}
                  value={field.value as [number, number]}
                  maxRoomPrice={maxRoomPrice}
                  minRoomPrice={minRoomPrice}
                />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              onClick={() => cleanForm()}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 h-8 px-3 bg-background/80"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t("reset")}</span>
            </Button>
            <Button
              type="submit"
              variant="gradient"
              size="sm"
              className="flex items-center gap-1 h-8 px-3 bg-background/80"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{t("submit")}</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs h-8"
            >
              {showFilters ? t("hideFilters") : t("showFilters")}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          <div className="flex items-center gap-2">
            {showFilters ? (
              <>
                <h3
                  className={cn(
                    "text-sm font-medium transition-all duration-500 ease-in-out",
                    showFilters ? "opacity-100" : "opacity-0",
                  )}
                >
                  {t("amenities")}
                </h3>
                {activeFilters > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {activeFilters}
                  </Badge>
                )}
              </>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            showFilters
              ? "max-h-[500px] opacity-100 mt-1"
              : "max-h-0 opacity-0 mt-0",
          )}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 p-4 bg-background/50 rounded-xl shadow-sm backdrop-blur-sm">
            <FilterCheckbox
              form={form}
              name="spa"
              label={t("spa")}
              icon={<Bath className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="gym"
              label={t("gym")}
              icon={<Dumbbell className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="bar"
              label={t("bar")}
              icon={<Wine className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="restaurant"
              label={t("restaurant")}
              icon={<UtensilsCrossed className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="freeWifi"
              label={t("freeWifi")}
              icon={<Wifi className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="shopping"
              label={t("shopping")}
              icon={<Store className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="freeParking"
              label={t("freeParking")}
              icon={<Car className="h-4 w-4" />}
            />

            <FilterCheckbox
              form={form}
              name="swimingPool"
              label={t("swimingPool")}
              icon={<Waves className="h-4 w-4" />}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
