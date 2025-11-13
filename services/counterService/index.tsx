import { createClerkSupabaseClient } from "@/lib/supabase/supabaseClient";

export const getHotelCount = async () => {
  const supabase = await createClerkSupabaseClient();
  const { count, error } = await supabase
    .from("hotel")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(error.message);
  }
  console.log("count---", count);
  return count;
};

export const getRoomCount = async () => {
  const supabase = await createClerkSupabaseClient();
  const { count, error } = await supabase
    .from("room")
    .select("*", { count: "exact", head: true });
  if (error) {
    throw new Error(error.message);
  }
  return count;
};
