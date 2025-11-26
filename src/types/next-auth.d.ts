import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        backendToken?: string;
        permissions?: string[];
        user: {
            id?: number;
            email?: string;
            name?: string;
        } & DefaultSession["user"];
    }

    interface User {
        backendToken?: string;
        permissions?: string[];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        backendToken?: string;
        permissions?: string[];
    }
}
