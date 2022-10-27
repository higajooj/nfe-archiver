import { User as PrismaUser } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User {
    id: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Omit<PrismaUser, "password">;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT callback object
   */
  interface JWT {
    id: string;
  }
}
