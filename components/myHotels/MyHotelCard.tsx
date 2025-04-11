"use client";
import { Button } from "@/components/ui/button";
import { deleteHotel } from "@/services/hotelService";
import { Eye, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";

export type MyHotelProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number[] | [];
};

const MyHotelCard = ({
  id,
  title,
  description,
  image,
  price,
}: MyHotelProps) => {
  const handleDeleteHotel = async (formData: FormData) => {
    const id = formData.get("id");
    const response = await deleteHotel(id as string);
    if (response.success === false && response.errorType === "hasBooking") {
      return toast.error(response.error);
    } else if (response.success === false) {
      return toast.error(response.error);
    } else if (
      response.success === true &&
      response.roomData &&
      response.roomData.length > 0
    ) {
      return toast.success("Hotel deleted with his rooms");
    } else {
      return toast.success("Hotel deleted successfully");
    }
  };

  return (
    <div className="bg-card rounded-xl border border-primary/10 overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-[300px] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute top-4 right-4">
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {price.length > 0
              ? `$ ${Math.min(...price)} - $ ${Math.max(...price)}`
              : `NA`}{" "}
            /night
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground line-clamp-2">{description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href={`/hotel/details/${id}`}>
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>

          <Link href={`/hotel/${id}`}>
            <Button variant="outline" className="w-full">
              <Pencil className="w-4 h-4 mr-2" />
              Update
            </Button>
          </Link>

          <form action={handleDeleteHotel}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton
              variant="outline"
              type="submit"
              text="Delete"
              loadingText="Deleting..."
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash className="w-4 h-4 mr-2" />
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyHotelCard;
