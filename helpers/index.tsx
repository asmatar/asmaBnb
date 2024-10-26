// create role on clñerk a tester

/* import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

const AddRoleToUser = () => {
  const { getToken } = useAuth();

  const addRoleToUser = async (userId: string, role: string) => {
    const token = await getToken({ template: "supabase" });

    const { data, error } = await supabase
      .from("auth.users")
      .update({ role })
      .eq("id", userId)
      .select()
      .single()
      .match({ id: userId })
      .auth(token!);

    if (error) {
      console.error(error);
      return;
    }

    console.log("Role added to user:", data);
  };

  // Utilisez la fonction addRoleToUser dans votre code de création d'utilisateur
}; */
