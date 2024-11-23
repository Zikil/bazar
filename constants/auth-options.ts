import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { Role } from "@prisma/client";


export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
                clientId: process.env.GITHUB_ID || '',
                clientSecret: process.env.GITHUB_SECRET || '',
                profile(profile) {
                    return {
                        id: profile.id,
                        name: profile.name || profile.login,
                        email: profile.email,
                        image: profile.avatar_url,
                        role: 'USER' as Role
                    }
                }
            }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const values = {
                    email: credentials.email
                }

                const findUser = await prisma.user.findFirst({
                    where: values
                })

                if (!findUser) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) {
                    return null;
                }

                // verified //

                return {
                    id: findUser.id,
                    
                    email: findUser.email,
                    name: findUser.name,
                    role: findUser.role,
                }


            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account}) {
            try {
                if (account?.provider === 'credentials') {
                    return true
                }

                if (!user.email){
                    return false
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerId as string },
                            { email: user.email }
                        ]
                    }
                })

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            id: findUser.id
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId
                        }
                    })
                    return true
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name || 'User #' + user.id,
                        password: hashSync(user.id.toString(), 10),    // ИЗМЕНИТЬ
                        provider: account?.provider,
                        providerId: account?.providerAccountId
                    }
                })

                return true;

            } catch (error) {
                console.error('Error [SIGNIN]', error)
                return false
            }
        },

        async jwt({ token }) {
            if (!token.email) {
                return token;
            }
            
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })
            if (findUser) {
                token.id = String(findUser.id);
                token.email = String(findUser.email);
                token.name = String(findUser.name);
                token.role = String(findUser.role);
            }

            return token
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                // session.user.email = token.email;
                session.user.role = token.role;
            }

            return session;
        }
    }
}