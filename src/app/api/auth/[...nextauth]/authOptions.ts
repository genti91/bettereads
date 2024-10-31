import {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
// TODO: por si queremos hacerlo con clave encriptada.
// import bcrypt from "bcryptjs"


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
              where: { username: credentials?.username, password: credentials?.password }
          })
      
          if(user){
            return { id: user.id, name: user.name, image: user.picture }
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
      session.user.id = token.sub ?? "";
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