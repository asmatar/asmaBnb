"use client";
import { Button } from "@/components/ui/button";
import { deleteHotel } from "@/services/hotelService";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  const handleDeleteHotel = async (id: string) => {
    await deleteHotel(id!);
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

        <Button
          variant="outline"
          type="button"
          className={`mt-4  text-primary py-2 px-4 rounded-lg w-full `}
          onClick={() => handleDeleteHotel(id)}
        >
          <Trash className="w-4 h-4 mr-3" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MyHotelCard;
