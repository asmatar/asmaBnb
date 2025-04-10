"use client";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getFilteredHotels } from "@/services/hotelService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bath,
  Building2,
  Car,
  Dumbbell,
  Globe,
  MapPin,
  RotateCcw,
  Search,
  Store,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";

type FormProps = {
  countryOptions: JSX.Element[];
  location: {
    country: string | null;
    state: string | null;
    city: string | null;
  }[];
};
export const searchHotelSchema = z.object({
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

type SearchHotelFormValues = z.infer<typeof searchHotelSchema>;

export default function Formulaire({ location, countryOptions }: FormProps) {
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const form = useForm<SearchHotelFormValues>({
    resolver: zodResolver(searchHotelSchema),
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
    await getFilteredHotels({
      ...values,
      spa: values.spa?.toString(),
      gym: values.gym?.toString(),
      bar: values.bar?.toString(),
      restaurant: values.restaurant?.toString(),
      freeWifi: values.freeWifi?.toString(),
      shopping: values.shopping?.toString(),
      freeParking: values.freeParking?.toString(),
      swimingPool: values.swimingPool?.toString(),
    });

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
        if (value !== undefined && value !== "") {
          acc[key] = typeof value === "boolean" ? String(value) : value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    const query = new URLSearchParams(formatedValues).toString();
    router.push(`?${query}`);
  }

  const fetchStates = (value: string) => {
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

  const fetchCities = async (value: string) => {
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

  // Calculer le nombre de filtres actifs
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
        {/* Première rangée: recherche et sélecteurs de localisation */}
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
                    placeholder="Search hotels..."
                    className="pl-10 border-none bg-background/80 shadow-sm backdrop-blur-sm h-11"
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                      form.handleSubmit(onSubmit)();
                    }}
                  />
                </div>
              )}
            />
          </div>

          <div className="md:col-span-3 flex space-x-3">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    onValueChange={(country) => {
                      field.onChange(country);
                      fetchStates(country);
                      form.handleSubmit(onSubmit)();
                    }}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="bg-background/80 shadow-sm backdrop-blur-sm border-none h-11">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue
                          placeholder="Select country"
                          defaultValue={field.value}
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent>{countryOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    disabled={form.getValues("country") === "" ? true : false}
                    onValueChange={async (state) => {
                      field.onChange(state);
                      await fetchCities(state);
                      form.handleSubmit(onSubmit)();
                    }}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="bg-background/80 shadow-sm backdrop-blur-sm border-none h-11">
                      <div className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue
                          placeholder="Select state"
                          defaultValue={field.value}
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent>{statesOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    disabled={form.getValues("state") === "" ? true : false}
                    onValueChange={(city) => {
                      field.onChange(city);
                      form.handleSubmit(onSubmit)();
                    }}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="bg-background/80 shadow-sm backdrop-blur-sm border-none h-11">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue
                          placeholder="Select city"
                          defaultValue={field.value}
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent>{citiesOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Titre des filtres avec bouton d'affichage et bouton Reset */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Amenities & Features</h3>
            {activeFilters > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {activeFilters}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => cleanForm()}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 h-8 px-3 bg-background/80"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs h-8"
            >
              {showFilters ? "Hide filters" : "Show filters"}
            </Button>
          </div>
        </div>

        {/* Conteneur pour l'animation */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: showFilters ? "500px" : "0",
            opacity: showFilters ? 1 : 0,
            marginTop: showFilters ? "0.5rem" : "0",
          }}
        >
          {/* Filtres supplémentaires */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 p-4 bg-background/50 rounded-xl shadow-sm backdrop-blur-sm">
            <FilterCheckbox
              form={form}
              name="spa"
              label="Spa"
              icon={<Bath className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="gym"
              label="Gym"
              icon={<Dumbbell className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="bar"
              label="Bar"
              icon={<Wine className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="restaurant"
              label="Restaurant"
              icon={<UtensilsCrossed className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="freeWifi"
              label="Free WiFi"
              icon={<Wifi className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="shopping"
              label="Shopping"
              icon={<Store className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="freeParking"
              label="Free Parking"
              icon={<Car className="h-4 w-4" />}
              onSubmit={onSubmit}
            />

            <FilterCheckbox
              form={form}
              name="swimingPool"
              label="Swimming Pool"
              icon={<Waves className="h-4 w-4" />}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

// Composant réutilisable pour les checkboxes de filtres
const FilterCheckbox = ({
  form,
  name,
  label,
  icon,
  onSubmit,
}: {
  form: UseFormReturn<SearchHotelFormValues>;
  name: keyof SearchHotelFormValues;
  label: string;
  icon: React.ReactNode;
  onSubmit: (values: SearchHotelFormValues) => Promise<void>;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean | undefined}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    form.handleSubmit(onSubmit)();
                  }}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="text-muted-foreground">{icon}</div>
                  <FormLabel className="cursor-pointer text-sm">
                    {label}
                  </FormLabel>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Filter by {label}</p>
              </TooltipContent>
            </FormItem>
          )}
        />
      </Tooltip>
    </TooltipProvider>
  );
};
