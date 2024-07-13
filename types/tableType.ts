import { Database } from "@/types/supabase";

export type InsertData = Database["public"]["Tables"]["hotel"]["Insert"];
export type InsertRoom = Database["public"]["Tables"]["room"]["Insert"];
