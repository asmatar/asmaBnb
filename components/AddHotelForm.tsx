"use client";
import AddRoomForm from "@/components/AddRoomForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCitiesByState, getStatesByCountry } from "@/services/Location";
import { createHotel, deleteHotel, uploadImage } from "@/services/supabaseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICity, ICountry, IState } from "country-state-city";
import { Pencil, Plus, Terminal, Trash, View } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
const hotelSchema = z.object({
  title: z.string().min(2, {
    message: "Hotel title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Hotel title must be at least 2 characters.",
  }),
  gym: z.boolean(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  locationDescription: z.string(),
  image: z.union([z.instanceof(File), z.string()]),
  bar: z.boolean(),
  bikeRental: z.boolean(),
  freeParking: z.boolean(),
  freeWifi: z.boolean(),
  laundry: z.boolean(),
  movieNights: z.boolean(),
  restaurant: z.boolean(),
  shopping: z.boolean(),
  spa: z.boolean(),
  coffeeShop: z.boolean(),
  swimingPool: z.boolean(),
});

const AddHotelForm = ({ countries }: { countries: ICountry[] }) => {
  const params = useParams();
  const { hotelId } = params;
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof hotelSchema>>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      title: "",
      description: "",
      gym: false,
      country: "",
      state: "",
      city: "",
      image: "",
      locationDescription: "",
      bar: false,
      bikeRental: false,
      freeParking: false,
      freeWifi: false,
      laundry: false,
      movieNights: false,
      restaurant: false,
      shopping: false,
      coffeeShop: false,
      spa: false,
      swimingPool: false,
    },
  });
  /*   const { data: countries, error: countriesError } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
  }); */

  const handleDeleteHotel = async (hotelId: string) => {
    await deleteHotel(hotelId!);
    router.push("/hotel/new");
  };
  async function onSubmit(values: z.infer<typeof hotelSchema>) {
    try {
      const file = values.image as File;

      if (file instanceof File) {
        const formData = new FormData();
        formData.append("image", file);

        await uploadImage(formData);
      }
      const id = uuidv4();
      const createHotelvalues = {
        ...values,
        image: (file as File).name || undefined,
        id,
      };

      await createHotel(createHotelvalues);
      router.push(`/hotel/${id}`);
      //form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchStates = async (value: string) => {
    const currentCountry =
      countries && countries.find((country) => country.name === value);
    const states = await getStatesByCountry(currentCountry!.isoCode);

    setStates(states);
  };
  const fetchCities = async (value: string) => {
    const currentState = states.find((state) => state.name === value);

    const cities = await getCitiesByState(
      currentState!.countryCode,
      currentState!.isoCode,
    );
    setCities(cities);
  };
  const countryOptions = (countries as ICountry[])?.map((country) => (
    <SelectItem key={country.name} value={country.name}>
      {country.name}
    </SelectItem>
  ));
  const statesOptions = states?.map((states) => (
    <SelectItem key={states.name} value={states.name}>
      {states.name}
    </SelectItem>
  ));
  const citiesOptions = cities?.map((city) => (
    <SelectItem key={city.name} value={city.name}>
      {city.name}
    </SelectItem>
  ));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="font-semibold text-lg">Describe your hotel</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel title *</FormLabel>
                  <FormDescription>provide your hotel name</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="beach hotel"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel description *</FormLabel>
                  <FormDescription>
                    provide a detail description of your hotel
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="beach hotel is parked with many amenities!"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <FormLabel>Choose Ameñities</FormLabel>
              <FormDescription>
                Choose Amenities popular in your hotel
              </FormDescription>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="gym"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Gym</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spa"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Spa</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Bar</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="laundry"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Laundry</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="restaurant"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Restaurant</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shopping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Shopping</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freeParking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Free Parking</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bikeRental"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Bike Rental</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freeWifi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Free Wifi</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="movieNights"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Movie Nights</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="swimingPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Swiming Pool</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coffeeShop"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Coffee Shop</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel image</FormLabel>
                  <FormDescription>
                    Choose an image that will showcase your hotel nicely
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      {...field}
                      value={""}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file || "");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col  gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Country *</FormLabel>
                    <FormDescription>
                      Choose a country where your hotel is located.
                    </FormDescription>
                    <Select
                      onValueChange={(country) => {
                        field.onChange(country);
                        fetchStates(country);
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
                    <FormLabel>Select a State *</FormLabel>
                    <FormDescription>
                      Choose a state where your hotel is located.
                    </FormDescription>
                    <Select
                      onValueChange={(city) => {
                        field.onChange(city);
                        fetchCities(city);
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
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select City (Optional)</FormLabel>
                  <FormDescription>
                    In wich city is your hotel located.
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
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
            <FormField
              control={form.control}
              name="locationDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location description *</FormLabel>
                  <FormDescription>
                    Provide more information about the exact location of your
                    hotel. Tip, use landmarks like school, hospital, church and
                    roads
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Beach hotel is located at the very end of the beach road"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {hotelId && (
              <Alert className="bg-indigo-600 text-white">
                <Terminal className="h-4 w-4 stroke-white" />
                <AlertTitle>One last step</AlertTitle>
                <AlertDescription>
                  Your hotel was creatyed successfully.
                  <p>please add some rooms to complete your hotel setup</p>
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-between gap-2 flex-wrap">
              {hotelId ? (
                <>
                  <Link href={`/hotel/details/${hotelId}`}>
                    <Button
                      variant="outline"
                      type="button"
                      className="max-w-[150px]"
                    >
                      <View className="w-4 h-4 mr-3" />
                      View
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleDeleteHotel(hotelId as string)}
                  >
                    <Trash className="w-4 h-4 mr-3" />
                    Delete
                  </Button>
                  <Dialog>
                    <DialogTrigger className="px-2 bg-background rounded-md flex items-center">
                      <Plus className="w-4 h-4 mr-3" />
                      Add room
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px] w-[90%]">
                      <DialogHeader className="px-2">
                        <DialogTitle>Add a room</DialogTitle>
                        <DialogDescription>
                          All details about a room in your hotel.
                        </DialogDescription>
                      </DialogHeader>

                      <AddRoomForm />
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button
                  variant="outline"
                  type="submit"
                  className="hover:bg-primary-foreground  dark:border-background"
                  disabled={!form.formState.isValid}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  {form.formState.isSubmitting ? "Saving..." : "create Hotel"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddHotelForm;
