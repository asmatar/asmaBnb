"use client";
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
import { Plus, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  createHotel,
  deleteHotel,
  uploadImage,
} from "@/lib/supabase/supabaseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash, View } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import * as z from "zod";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  gym: z.boolean(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  locationDescription: z.string(),
  image: z.union([z.instanceof(File), z.string(), z.null()]),
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

const HotelNew = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hotelId = searchParams.get("hotelId");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  // 2. Define a submit handler.

  // Do something with the form values.
  const handleDeleteHotel = async (hotelId: string) => {
    await deleteHotel(hotelId!);
    router.push("/hotel/new");
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let imageUrl: string | undefined = "";
      if (values.image instanceof File) {
        await uploadImage(values.image);
        imageUrl = values.image.name;
      } else {
        const id = uuid4();
        const createHotelvalues = {
          ...values,
          image: imageUrl,
          id,
        };
        await createHotel(createHotelvalues);
        // i want to add a query to my link

        router.push(`/hotel/new?hotelId=${id}`);
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
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
                            checked={
                              /*               field.value !== null ? field.value : undefined */
                              field.value
                            }
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
                      <FormLabel>Select a Country</FormLabel>
                      <FormDescription>
                        Choose a country where your hotel is located.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="select a country"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {/* dynamic from package country-state-city*/}
                          <SelectItem value="light">country one</SelectItem>
                          <SelectItem value="dark">counmtry 2</SelectItem>
                          <SelectItem value="system">country 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select a State</FormLabel>
                      <FormDescription>
                        Choose a state where your hotel is located.
                      </FormDescription>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="select a state"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {/* dynamic from package country-state-city*/}
                          <SelectItem value="light">country one</SelectItem>
                          <SelectItem value="dark">counmtry 2</SelectItem>
                          <SelectItem value="system">country 3</SelectItem>
                        </SelectContent>
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
                      <SelectContent>
                        {/* dynamic from package country-state-city*/}
                        <SelectItem value="light">country one</SelectItem>
                        <SelectItem value="dark">counmtry 2</SelectItem>
                        <SelectItem value="system">country 3</SelectItem>
                      </SelectContent>
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
                      hotel. Tip, use landmarks like school, hospital, church
                      and roads
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
                    <Link href="/hotel/details/${hotelId}">
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
                      onClick={() => handleDeleteHotel(hotelId)}
                    >
                      <Trash className="w-4 h-4 mr-3" />
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant="outline"
                          type="button"
                          className="max-w-[150px]"
                        >
                          <Plus className="w-4 h-4 mr-3" />
                          Add room
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add a room</DialogTitle>
                          <DialogDescription>
                            All details about a room in your hotel.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <Button variant="outline" type="submit">
                    <Pencil className="w-4 h-4 mr-2" />
                    Create Hotel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HotelNew;
