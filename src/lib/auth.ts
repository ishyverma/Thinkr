import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import { DefaultSession, NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        username: string;
    }
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            email: string;
            username: string;
            name?: string | null;
            image?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        email: string;
    }
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { 
                    label: "Username or Email", 
                    type: "text", 
                    placeholder: "username or email" 
                },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: credentials.identifier },
                            { email: credentials.identifier }
                        ]
                    }
                });

                if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    username: user.username
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.username = token.username
                session.user.email = token.email
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
    pages: {
        signIn: "/signin"
    },
} satisfies NextAuthOptions;