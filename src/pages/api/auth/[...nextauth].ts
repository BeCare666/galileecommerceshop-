import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";
import type { Account, Profile } from "next-auth";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ account, profile }) {
            if (!account || !profile) return false;

            try {
                const res = await axios.post(
                    `${process.env.NEXTAUTH_URL}/api/auth/oauth-exchange`,
                    {
                        provider: account.provider,
                        profile: {
                            email: (profile as Profile).email,
                            name: (profile as Profile).name,
                        },
                    }
                );

                // On attache les infos backend au compte NextAuth
                (account as Account & { backendToken: string; permissions: string[] }).backendToken =
                    res.data.token;

                (account as Account & { backendToken: string; permissions: string[] }).permissions =
                    res.data.permissions;

                return true;
            } catch (e) {
                console.error("⚠️ Social login failed:", e);
                return false;
            }
        },

        async jwt({ token, account }) {
            if (account && "backendToken" in account) {
                token.backendToken = (account as any).backendToken;
                token.permissions = (account as any).permissions;
            }
            return token;
        },

        async session({ session, token }) {
            if (token.backendToken) {
                session.backendToken = token.backendToken as string;
                session.permissions = token.permissions as string[];
            }
            return session;
        },
    },
});
