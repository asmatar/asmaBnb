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
import { uploadImageRoom } from "@/services/imageService";
import { createRoom, updateRoom } from "@/services/roomService";
import { Room } from "@/types/tableType";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

type AddRoomFormProps = {
  room?: Room;
};
const AddRoomForm = ({ room }: AddRoomFormProps) => {
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
      breakfastPrice: room?.breakfastPrice || undefined,
      bedCount: room?.bedCount || undefined,
      kingBed: room?.kingBed || undefined,
      guestCount: room?.guestCount || undefined,
      queenBed: room?.queenBed || undefined,
      bathroomCount: room?.bathroomCount || undefined,
    },
    shouldUnregister: true,
  });
  const { user } = useUser();
  const isOwner = user?.id === room?.user_id;
  const params = useParams();
  const hotelId = params?.hotelId;

  async function onSubmitRoom(values: z.infer<typeof roomSchema>) {
    try {
      const file = values.image as File;
      if (room) {
        const updatingRoomValues = {
          ...values,
          image: (file as File).name || undefined,
          id: room.id as string,
        };

        await updateRoom(updatingRoomValues);
        return;
      }
      if (file instanceof File) {
        const formData = new FormData();
        formData.append("image", file);

        await uploadImageRoom(formData);
      }
      const id = uuidv4();
      const createRoomvalues = {
        ...values,
        image: (file as File).name || undefined,
        hotel_id: hotelId as string,
        id,
      };
      await createRoom(createRoomvalues);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form
          id="addRoomForm"
          onSubmit={form.handleSubmit(onSubmitRoom)}
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
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {room && isOwner ? (
            <Button variant="outline" type="submit" form="addRoomForm">
              <MdUpdate className="w-4 h-4 mr-2" />
              Update
            </Button>
          ) : (
            <Button
              variant="outline"
              type="submit"
              form="addRoomForm"
              //disabled={!form.formState.isValid}
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
