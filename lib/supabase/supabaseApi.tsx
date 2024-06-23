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
  const imagePath = `https://cgttmkwcbvtneztdpkod.supabase.co/storage/v1/object/public/hotels/public/${newHotel.image}`;
  console.log(imagePath);
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
  console.log(file.name);
  const { data, error } = await supabase.storage
    .from("hotels")
    .upload(`public/${file.name}`, file);
  if (error) {
    throw new Error("image could not be uploaded");
  }
  return data;
};

export const getOneHotel = async (id: string) => {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("hotel")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error("hotel not found");
  }
  return data;
};
