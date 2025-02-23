import { Roles } from "@/types/user";
import { auth } from "@clerk/nextjs/server";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();
  console.log(sessionClaims);
  return sessionClaims?.metadata.role === role;
};
