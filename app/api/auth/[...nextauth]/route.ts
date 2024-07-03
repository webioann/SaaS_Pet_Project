import NextAuth, { NextAuthOptions } from "next-auth"
import { authOptions } from "../../../../configs/authOptions.config";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }; 
