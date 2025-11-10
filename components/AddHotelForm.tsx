"use client";
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
import { Link } from "@/i18n/navigation";
import { hotelSchema } from "@/schema/formSchema";
import { createHotel, deleteHotel, updateHotel } from "@/services/hotelService";
import { uploadImage } from "@/services/imageService";
import {
  getCitiesByState,
  getStatesByCountry,
} from "@/services/locationService";
import { Hotel } from "@/types/tableType";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICity, ICountry, IState } from "country-state-city";
import { Pencil, Plus, Terminal, Trash, View, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Path, useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import AddRoomForm from "./AddRoomForm";
const AddHotelForm = ({
  countries,
  hotel,
}: {
  countries: ICountry[];
  hotel?: Hotel;
}) => {
  const params = useParams();
  const { hotelId } = params;
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const router = useRouter();
  const { user } = useUser();
  const isOwner = user?.id === hotel?.user_id;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const setIsDialogOpen = (value: boolean) => {
    setIsDialogOpened(value);
  };
  const t = useTranslations("AddHotelForm");
  const formHotel = useForm<z.infer<typeof hotelSchema>>({
    resolver: zodResolver(hotelSchema),
    mode: "onBlur",
    defaultValues: {
      title: hotel?.title ?? "",
      description: hotel?.description ?? "",
      gym: hotel?.gym ?? false,
      country: hotel?.country ?? "",
      state: hotel?.state ?? "",
      city: hotel?.city ?? "",
      image: hotel?.image ?? "",
      locationDescription: hotel?.locationDescription ?? "",
      bar: hotel?.bar ?? false,
      bikeRental: hotel?.bikeRental ?? false,
      freeParking: hotel?.freeParking ?? false,
      freeWifi: hotel?.freeWifi ?? false,
      laundry: hotel?.laundry ?? false,
      movieNights: hotel?.movieNights ?? false,
      restaurant: hotel?.restaurant ?? false,
      shopping: hotel?.shopping ?? false,
      coffeeShop: hotel?.coffeeShop ?? false,
      spa: hotel?.spa ?? false,
      swimingPool: hotel?.swimingPool ?? false,
    },
    shouldUnregister: true,
  });

  const handleDeleteHotel = async (hotelId: string) => {
    const response = await deleteHotel(hotelId!);
    if (response.success === false) {
      if (response.errorType === "hasBooking") {
        return toast.error(response.error);
      }
      return toast.error(response.error);
    }

    if (response.success === true) {
      if (response.roomData && response.roomData.length > 0) {
        router.push("/hotel/new");
        return toast.success("Hotel deleted with his rooms");
      }

      router.push("/hotel/new");
      return toast.success("Hotel deleted successfully");
    }
  };
  async function onSubmit(values: z.infer<typeof hotelSchema>) {
    try {
      const file = values.image as File;
      console.log("file", file);
      if (hotelId) {
        const updatingHotelValues = {
          ...values,
          image: (file as File).name || undefined,
          id: hotelId as string,
        };

        const response = await updateHotel(updatingHotelValues);
        if (response.success === false) {
          return toast.error(response.error);
        } else {
          toast.success("Hotel updated successfully");
        }
      }
      console.log(typeof file);
      if (file && file instanceof Object) {
        console.log("file is a valid File object");
        const formData = new FormData();
        formData.append("image", file);

        console.log("formData created", formData.getAll);
        try {
          console.log("image uploaded successfully");
          await uploadImage(formData);
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
        }
      } else {
        console.log("file is not a valid File object", file);
      }

      const id = uuidv4();

      const createHotelvalues = {
        ...values,
        image: (file as File).name,
        id,
      };

      const response = await createHotel(createHotelvalues);
      if (response.success === false) {
        console.log("zrong");
        return toast.error(response.error);
      }
      router.push(`/hotel/${id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const fetchStates = async (value: string) => {
    const currentCountry =
      countries && countries.find((country) => country.name === value);
    const states = await getStatesByCountry(currentCountry!.isoCode);
    if (formHotel.getValues("state") !== "") {
      formHotel.resetField("state");
    }
    if (formHotel.getValues("city") !== "") {
      formHotel.resetField("city");
    }
    setStates(states);
  };
  const fetchCities = async (value: string) => {
    const currentState = states.find((state) => state.name === value);

    const cities = await getCitiesByState(
      currentState!.countryCode,
      currentState!.isoCode,
    );
    if (formHotel.getValues("city") !== "") {
      formHotel.resetField("city");
    }
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

  useEffect(() => {
    const firstError = Object.keys(formHotel.formState.errors)[0];
    if (firstError) {
      formHotel.setFocus(firstError as Path<z.infer<typeof hotelSchema>>);
    }
  }, [formHotel.formState.errors, formHotel.setFocus, formHotel]);
  return (
    <Form {...formHotel}>
      <form
        onSubmit={formHotel.handleSubmit(onSubmit)}
        className="space-y-6"
        id="addHotelForm"
        data-form-type="hotel-form"
      >
        <h3 className="font-semibold text-lg">{t("hotelDescription")}</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <FormField
              control={formHotel.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("hotelTitle")}</FormLabel>
                  <FormDescription>
                    {t("hotelTitleDescription")}
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder={t("hotelTitlePlaceholder")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formHotel.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("hotelDescription")}</FormLabel>
                  <FormDescription>
                    {t("hotelDescriptionDescription")}
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder={t("hotelDescriptionPlaceholder")}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <FormLabel>{t("chooseAmenities")}</FormLabel>
              <FormDescription>
                {t("chooseAmenitiesDescription")}
              </FormDescription>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={formHotel.control}
                  name="gym"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("gym")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="spa"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("spa")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="bar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("bar")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="laundry"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("laundry")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="restaurant"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("restaurant")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="shopping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("shopping")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="freeParking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("freeParking")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="bikeRental"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("bikeRental")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="freeWifi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("freeWifi")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="movieNights"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("movieNights")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="swimingPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("swimingPool")}</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formHotel.control}
                  name="coffeeShop"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 rounded-md  p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{t("coffeeShop")}</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={formHotel.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <FormLabel>{t("hotelImage")}</FormLabel>
                      <FormDescription>
                        {t("hotelImageDescription")}
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="file"
                          ref={inputImageRef}
                          name="image"
                          className=""
                          accept=".png, .jpg, .jpeg"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            field.onChange(file || "");
                            if (file) {
                              setPreviewUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>

                    {previewUrl && (
                      <div className="relative">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="rounded-md border object-cover relative"
                        />
                        <XCircle
                          className="w-4 h-4 mr-3 absolute right-0 top-0 bg-white cursor-pointer"
                          onClick={() => {
                            setPreviewUrl("");

                            inputImageRef.current!.value = "";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col  gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={formHotel.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("selectCountry")}</FormLabel>
                    <FormDescription>
                      {t("selectCountryDescription")}
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
                          placeholder={t("selectCountryPlaceholder")}
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                      <SelectContent>{countryOptions}</SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={formHotel.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("selectState")}</FormLabel>
                    <FormDescription>
                      {t("selectStateDescription")}
                    </FormDescription>
                    <Select
                      disabled={
                        formHotel.getValues("country") === "" ? true : false
                      }
                      onValueChange={(city) => {
                        field.onChange(city);
                        fetchCities(city);
                      }}
                      defaultValue={field.value || undefined}
                      value={field.value || undefined}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          placeholder={t("selectStatePlaceholder")}
                        />
                      </SelectTrigger>
                      <SelectContent>{statesOptions}</SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={formHotel.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("selectCity")}</FormLabel>
                  <FormDescription>
                    {t("selectCityDescription")}
                  </FormDescription>
                  <Select
                    disabled={
                      formHotel.getValues("state") === "" ? true : false
                    }
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder={t("selectCityPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>{citiesOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={formHotel.control}
              name="locationDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("locationDescription")}</FormLabel>
                  <FormDescription>
                    {t("locationDescriptionDescription")}
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder={t("locationDescriptionPlaceholder")}
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
                <AlertTitle>{t("oneLastStep")}</AlertTitle>
                <AlertDescription>
                  {t("pleaseAddSomeRooms")}
                  <p>{t("pleaseAddSomeRoomsToCompleteYourHotelSetup")}</p>
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
                      {t("viewHotel")}
                    </Button>
                  </Link>
                  {isOwner ? (
                    <>
                      <Button
                        variant="outline"
                        type="submit"
                        disabled={!formHotel.formState.isValid}
                      >
                        <MdUpdate className="w-4 h-4 mr-3" />
                        {formHotel.formState.isSubmitting
                          ? t("updating")
                          : t("update")}
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleDeleteHotel(hotelId as string)}
                      >
                        <Trash className="w-4 h-4 mr-3" />
                        {t("delete")}
                      </Button>
                      <Dialog
                        open={isDialogOpened}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger className="px-2 bg-background rounded-md flex items-center ">
                          <Plus className="w-4 h-4 mr-3" />
                          {t("addRoom")}
                        </DialogTrigger>
                        <DialogContent className="max-w-[900px] w-[90%] z-[80]">
                          <DialogHeader className="px-2">
                            <DialogTitle>{t("addRoom")}</DialogTitle>
                            <DialogDescription>
                              {t("allDetailsAboutARoomInYourHotel")}
                            </DialogDescription>
                          </DialogHeader>
                          <AddRoomForm setFormOpen={setIsDialogOpen} />
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : null}
                </>
              ) : (
                <Button
                  variant="outline"
                  type="submit"
                  className="hover:bg-primary-foreground  dark:border-background"
                  form="addHotelForm"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  {formHotel.formState.isSubmitting
                    ? t("saving")
                    : t("createHotel")}
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
