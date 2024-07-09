import NextAuth from "next-auth"
import { authConfig } from "./new_options"

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST };