import { Database } from "@/types/supabase";
/* import { createClient } from "@supabase/supabase-js"; */
import { createClient } from "@supabase/supabase-js";

export const createClerkSupabaseClient = async () => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );

  return supabase;
};
