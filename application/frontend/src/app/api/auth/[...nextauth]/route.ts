import NextAuth, { AuthOptions, DefaultUser, Session } from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Credential from 'next-auth/providers/credentials'
import { AdapterUser } from 'next-auth/adapters'
import { apiClient } from '@/shared/apiClient'
import { redirect } from 'next/dist/server/api-utils'

type User = AdapterUser & {
    role: string
}
declare module 'next-auth' {
    interface Session {
        user: DefaultUser & {
            role: string
        }
    }
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google({
            id: 'google',
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    firstname: profile.given_name,
                    lastname: profile.family_name,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role
                }
            }
        }),
        Credential({
            id: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    console.log("credentials", credentials);
                    const response = await apiClient("/auth/signIn", {
                        method: 'POST',
                        body: {
                            username: credentials?.username,
                            password: credentials?.password,
                        },
                    })
                    const user = await response.json()
                    console.log(user);
                    // If no error and we have user data, return it
                    if (response.ok && user) {
                        return user
                    }
                    // Throw a 401 error if user data could not be retrieved
                    console.log('user not found');
                    return null;
                } catch (error) {
                    console.log(error);
                    return null;
                }

            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        //  signOut: '/auth/signout',
        //  error: '/auth/error', // Error code passed in query string as ?error=
        //  verifyRequest: '/auth/verify-request', // (used for check email message)
        //  newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        jwt({ token, user }) {
            if (user) token.role = (user as User).role
            return token
        },
        session({ session, token }) {
            session.user.role = token.role as string
            if (session.user.role === undefined) {
                session.user.role = 'user'
            }
            return session
        }
        
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }