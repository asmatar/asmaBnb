import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";

export const uploadImageRoom = async (formData: FormData) => {
  const supabase = await createClerkSupabaseClient();
  const file = formData.get("image") as File;

  const { data, error } = await supabase.storage
    .from("room")
    .upload(`public/${file.name}`, file);
  if (error) {
    error.message;
  }
  return data;
};
export const uploadImage = async (formData: FormData) => {
  console.log("inside uplooooaddd");
  const supabase = await createClerkSupabaseClient();
  const file = formData.get("image") as File;
  console.log("file inside upload image", file);
  const { data, error } = await supabase.storage
    .from("hotels")
    .upload(`public/${file.name}`, file);
  if (error) {
    console.log("if errro", error);
    error.message;
  }
  console.log("first", data);
  return data;
};
