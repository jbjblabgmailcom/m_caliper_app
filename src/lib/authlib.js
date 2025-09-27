import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]"; // adjust if needed

export async function authlib() {
  return await getServerSession(authOptions);
}