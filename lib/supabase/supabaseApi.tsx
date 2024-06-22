import { InsertData } from "@/types/tableType";
import { createClerkSupabaseClient } from "./supabaseClient";
export const getHotels = async () => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase.from("hotel").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

export const createHotel = async (newHotel: InsertData) => {
  //https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/hotels/hotel-one.jpg

  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/hotels/${newHotel.image}`;

  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("hotel")
    .insert([{ ...newHotel, image: imagePath }]);

  if (error) {
    throw new Error("hotel could not be created");
  }
  return data;
};
export const uploadImage = async (file: File) => {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase.storage
    .from("hotels")
    .upload(`public/${file.name}`, file);
  if (error) {
    throw new Error("image could not be uploaded");
  }
  return data;
};
