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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

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
  const pathname = usePathname();
  const cleanForm = () => {
    form.reset();
    setFilteredStates([]);
    setFilteredCities([]);
    router.push(pathname);
  };
  async function onSubmit(values: z.infer<typeof searchHotelSchema>) {
    console.log("submit");
    await getFilteredHotels({
      ...values,
      title: values.title,
    });
    const query = new URLSearchParams(values).toString();
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex items-center gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            console.log(field),
            (
              <Input
                title="country"
                type="search"
                {...field}
                placeholder="Search..."
                className="w-[270px] border-0 "
                value={field.value}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  form.handleSubmit(onSubmit)();
                }}
              />
            )
          )}
        />
        <div className=" grid grid-cols-4 gap-4 max-w-[690px]">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(country) => {
                    field.onChange(country);
                    fetchStates(country);
                    form.handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <SelectTrigger className="bg-background ">
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
                  <SelectTrigger className="bg-background ">
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
          <Button type="button" onClick={() => cleanForm()}>
            Reset fields
          </Button>
        </div>
      </form>
    </Form>
  );
}
