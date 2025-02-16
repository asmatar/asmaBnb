"use client";
import { Button } from "@/components/ui/button";
import { deleteHotel } from "@/services/hotelService";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";

export type MyHotelProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
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
    } else if (response.success === true && response.roomData.length > 0) {
      return toast.success("Hotel deleted with his rooms");
    } else {
      return toast.success("Hotel deleted successfully");
    }
  };

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-md overflow-hidden transition relative hover:scale-105"
    >
      <div className="relative h-72 group">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg transition group-hover:scale-10"
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description.slice(0, 100)}...</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">${price}/night</span>
        </div>
        <div className="flex justify-between space-x-2">
          <Link href={`/hotel/details/${id}`}>
            <Button
              variant="outline"
              type="button"
              className=" text-primary py-2 px-4 rounded-lg w-full"
            >
              View Details
            </Button>
          </Link>
          <Link href={`/hotel/${id}`}>
            <Button
              variant="outline"
              type="button"
              className=" text-primary py-2 px-4 rounded-lg w-full"
            >
              Update
            </Button>
          </Link>
        </div>
        <form action={handleDeleteHotel}>
          <input type="hidden" name="id" value={id} />
          <SubmitButton
            variant="outline"
            type="button"
            text="Delete"
            className={`mt-4  text-primary py-2 px-4 rounded-lg w-full `}
            loadingText="Deleting..."
          >
            <Trash className="w-4 h-4 mr-3" />
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default MyHotelCard;
