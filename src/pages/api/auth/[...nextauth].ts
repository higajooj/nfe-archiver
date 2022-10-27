import * as argon2 from "argon2";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        const user = await prisma.user.findUnique({ where: { id: token.id } });
        if (user) {
          user.password = "";
          session.user = user;
        }
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john doe" },
        password: { label: "Password", type: "password", placeholder: "123" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) return null;

        const passwordCorrect = await argon2.verify(
          user.password,
          credentials.password
        );
        if (!passwordCorrect) return null;

        return { id: user.id };
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
