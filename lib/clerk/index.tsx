import { Roles } from "@/types/user";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
export async function getUserCount() {
  const users = await clerkClient.users.getUserList();

  return users.totalCount;
}
