import NextAuth, { NextAuthOptions } from "next-auth"
import { authConfig } from "./options";

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }; 
