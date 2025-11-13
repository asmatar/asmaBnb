import { Database } from "@/types/supabase";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function createClerkSupabaseClient() {
  const { getToken } = auth();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  return createClient<Database>(supabaseUrl!, supabaseKey!, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await getToken();

        const headers = new Headers(options?.headers);

        if (clerkToken) {
          headers.set("Authorization", `Bearer ${clerkToken}`);
        } else {
          console.log(
            "🟡 [createClerkSupabaseClient] ⚠️ Aucun token Clerk disponible!",
          );
        }

        const response = await fetch(url, {
          ...options,
          headers,
        });

        return response;
      },
    },
  });
}
