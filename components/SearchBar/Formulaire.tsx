"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFilteredHotels } from "@/services/supabaseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormProps = {
  countryOptions: JSX.Element[];
  location: {
    country: string | null;
    state: string | null;
    city: string | null;
  }[];
};
export const searchHotelSchema = z.object({
  title: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
});
export default function Formulaire({ location, countryOptions }: FormProps) {
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const form = useForm<z.infer<typeof searchHotelSchema>>({
    resolver: zodResolver(searchHotelSchema),
    defaultValues: {
      title: "",
      country: "",
      state: "",
      city: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof searchHotelSchema>) {
    console.log("value", values);
    const dataFilterted = await getFilteredHotels(values);
    // si country cahnge alors reset state et city
    // si state cahnge alors reset citi
    // si title change alors reset country-state-city

    console.log(dataFilterted);
    const query = new URLSearchParams(values).toString();
    router.push(`?${query}`);
  }

  const fetchStates = (value: string) => {
    const filteredStatesDuplicate = location
      .filter((location) => location.country === value)
      .map((location) => location.state);

    const filteredStates = [...new Set(filteredStatesDuplicate)];
    if (form.getValues("state") !== "") {
      //const query = new URLSearchParams({ state: "" });
    }
    setFilteredStates(filteredStates as string[]);
  };

  const fetchCities = async (value: string) => {
    const filteredCitiesDuplicate = location
      .filter((location) => location.state === value)
      .map((location) => location.city);
    console.log(filteredCitiesDuplicate);

    const filteredCities = [...new Set(filteredCitiesDuplicate)];
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Input
          title="country"
          type="search"
          placeholder="Search..."
          className="w-full border-0"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(country) => {
                    console.log(country);
                    field.onChange(country);
                    fetchStates(country);
                    form.handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue
                      placeholder="select a country"
                      defaultValue={field.value}
                    />
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
              <FormItem>
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
                  <SelectTrigger className="bg-background">
                    <SelectValue
                      placeholder="select a state"
                      defaultValue={field.value}
                    />
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
              <FormItem>
                <Select
                  disabled={form.getValues("state") === "" ? true : false}
                  onValueChange={(city) => {
                    field.onChange(city);
                    form.handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue
                      placeholder="Beach hotel is located at the very end of the beach road"
                      defaultValue={field.value}
                    />
                  </SelectTrigger>
                  <SelectContent>{citiesOptions}</SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
