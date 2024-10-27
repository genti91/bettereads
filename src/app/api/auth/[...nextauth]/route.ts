import NextAuth, {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
// TODO: por si queremos hacerlo con clave encriptada.
// import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: AuthOptions = 
{
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
          const user = await prisma.user.findUnique({
              where: { username: credentials?.username }
          })
      
          if(user){
            return { id: user.id, name: user.username }
          }
          return null

      // SI lo quiero hacer con clave enciptada
      //   if (user && bcrypt.compareSync(credentials.password, user.password)) {
      //     return { id: user.id, name: user.username }
      //   }

      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };