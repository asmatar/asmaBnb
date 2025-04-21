"use client";
import { Button } from "@/components/ui/button";

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
import { roomSchema } from "@/schema/formSchema";
import { createRoom, updateRoom } from "@/services/roomService";
import { Room } from "@/types/tableType";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Path, useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

type AddRoomFormProps = {
  room?: Room;
  setFormOpen: (value: boolean) => void;
};
const AddRoomForm = ({ room, setFormOpen }: AddRoomFormProps) => {
  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      roomTitle: room?.roomTitle || "",
      roomDescription: room?.roomDescription || "",
      roomService: room?.roomService || false,
      TV: room?.TV || false,
      balcony: room?.balcony || false,
      freeWifi: room?.freeWifi || false,
      cityView: room?.cityView || false,
      oceanView: room?.oceanView || false,
      forestView: room?.forestView || false,
      mountainView: room?.mountainView || false,
      airCondition: room?.airCondition || false,
      soundProofed: room?.soundProofed || false,
      image: room?.image || "",
      roomPrice: room?.roomPrice || undefined,
      breakfastPrice: room?.breakfastPrice,
      bedCount: room?.bedCount || null,
      kingBed: room?.kingBed || undefined,
      guestCount: room?.guestCount || undefined,
      queenBed: room?.queenBed || undefined,
      bathroomCount: room?.bathroomCount || undefined,
    },
    shouldUnregister: true,
  });
  useEffect(() => {
    const firstError = Object.keys(form.formState.errors)[0];
    if (firstError) {
      form.setFocus(firstError as Path<z.infer<typeof roomSchema>>);
    }
  }, [form.formState.errors, form.setFocus, form]);
  const { user } = useUser();
  const isOwner = user?.id === room?.user_id;
  const params = useParams();
  const hotelId = params?.hotelId as string;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  async function onSubmitRoom(values: z.infer<typeof roomSchema>) {
    try {
      console.log("Starting room submission process with values:", values);
      const file = values.image as File;

      // Vérification du hotelId
      if (!hotelId) {
        console.error("No hotelId found in params");
        toast.error("Hotel ID is missing, cannot create room");
        return;
      }

      console.log("Hotel ID:", hotelId);

      // Vérifions si c'est bien un objet File valide
      if (file && typeof file === "object" && "name" in file) {
        console.log("Valid file object found:", file.name);

        if (room) {
          console.log("Updating existing room");
          const updatingRoomValues = {
            ...values,
            image: file.name || undefined,
            id: room.id as string,
          };

          const response = await updateRoom(updatingRoomValues);
          if (response.success) {
            toast.success("Room updated successfully");
            setFormOpen(false);
          } else {
            console.error("Room update failed:", response.error);
            return toast.error(response.error);
          }
        } else {
          console.log("Creating new room");
          // Upload d'image
          try {
            const formData = new FormData();
            formData.append("image", file);
            console.log("FormData created with image:", file.name);

            // Skip image upload for now, just create the room
            console.log("Skipping image upload, proceeding with room creation");

            // Création de chambre
            const id = uuidv4();
            console.log("Generated new room ID:", id);

            // Assurons-nous que tous les champs requis sont présents
            const createRoomvalues = {
              ...values,
              image: file.name,
              hotel_id: hotelId,
              id,
            };
            console.log(
              "Creating room with values:",
              JSON.stringify(createRoomvalues),
            );

            try {
              const response = await createRoom(createRoomvalues);
              console.log("Room creation response:", response);

              if (response.success) {
                toast.success("Room created successfully");
                form.reset();
                setFormOpen(false);
              } else {
                console.error("Room creation failed:", response.error);
                toast.error(response.error || "Failed to create room");
              }
            } catch (roomError) {
              console.error("Error creating room:", roomError);

              // Afficher plus de détails sur l'erreur
              if (roomError instanceof Error) {
                console.error("Error message:", roomError.message);
                console.error("Error stack:", roomError.stack);
              }

              toast.error("Error creating room - see console for details");
            }
          } catch (uploadError) {
            console.error(
              "Error during image upload or room creation:",
              uploadError,
            );
            toast.error("Error during room creation process");
          }
        }
      } else {
        console.error("Invalid file object:", file);
        toast.error("Please select a valid image file for the room");
      }
    } catch (error) {
      console.error("Overall error in onSubmitRoom:", error);
      toast.error("Failed to create room");
    }
  }
  return (
    <div className="max-h-[75vh] overflow-y-auto px-2 z-[80]">
      <Form {...form}>
        <form
          id="addRoomForm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(onSubmitRoom)(e);
          }}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="roomTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Title *</FormLabel>
                <FormDescription>Provide a room name</FormDescription>
                <FormControl>
                  <Input placeholder="double room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room description *</FormLabel>
                <FormDescription>
                  Is there anythinig special about this room ?
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="double room have 2 king size beds with a sitting area"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <FormLabel>Choose Room amenities</FormLabel>
            <FormDescription> what makes this room special ?</FormDescription>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <FormField
                control={form.control}
                name="roomService"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>24hrs Room Services</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TV"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>TV</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balcony"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>balcony</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="freeWifi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
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
                name="cityView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>City view</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oceanView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Ocean view</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="forestView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Forest view</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mountainView"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Mountain view</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airCondition"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Air conditioned</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="soundProofed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Sound Proofed</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <FormLabel>Hotel image</FormLabel>
                      <FormDescription>
                        Choose an image that will showcase your hotel nicely
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="file"
                          ref={inputImageRef}
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
            <div className="grid grid-cols-2 gap-2 mt-2">
              <FormField
                control={form.control}
                name="roomPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Price in USD *</FormLabel>
                    <FormDescription>
                      What is the price for staying in this room 24hrs?
                    </FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="breakfastPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breakfast Price in USD (Optional)</FormLabel>
                    <FormDescription>
                      If you offer breakfast, what is the price
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bed Count *</FormLabel>
                    <FormDescription>
                      how many beds are avaliable in this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kingBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>King Beds (Optional)</FormLabel>
                    <FormDescription>
                      how many king size beds are in this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Count *</FormLabel>
                    <FormDescription>
                      How many guest are allowed in this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="queenBed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Queen Bed (Optional)</FormLabel>
                    <FormDescription>
                      How many Queen Bed are in this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathroomCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathroom Count *</FormLabel>
                    <FormDescription>
                      How many bathroom are in this room?
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {room && isOwner ? (
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmitRoom)(e);
              }}
            >
              <MdUpdate className="w-4 h-4 mr-2" />
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
          ) : (
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmitRoom)(e);
              }}
            >
              <Pencil className="w-4 h-4 mr-2" />
              {form.formState.isSubmitting ? "Saving..." : "create Room"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
