import NextAuth, { AuthOptions, DefaultUser } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credential from 'next-auth/providers/credentials'
import { AdapterUser } from 'next-auth/adapters'
import { api } from '@/shared/apiClient'

type User = AdapterUser & {
    roles: string[]
}
declare module 'next-auth' {
    interface Session {
        user: DefaultUser & {
            roles: string[]
        }
    }
}

const authOptions: AuthOptions = {
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
            async authorize(credentials) {
                try {
                    console.log("credentials", credentials);
                    const response = await api.post("/auth/signIn", {
                            username: credentials?.username,
                            password: credentials?.password,
                    });
                    const user = await response.json();
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
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60 , // 1 day
        updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: '/auth/signin',
        //  signOut: '/auth/signout',
        //  error: '/auth/error', // Error code passed in query string as ?error=
        //  verifyRequest: '/auth/verify-request', // (used for check email message)
        //  newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        jwt({ token, account, user }) {
            if(user){

                const roles= (user as User).roles;
                if(roles){
                    console.log('roles ', roles);
                    token.roles = roles;    
                }
                else{
                    console.log('roles user', roles);
                    token.roles = ['user'];
                }
            }
            return token
        },
        session({ session, token }) {
            if(token.role){
                session.user.roles = [token.role as string];
            }
            else if(token.roles){
                session.user.roles = token.roles as string[];
            }
            else{
                session.user.roles = ['user'];
            }
            return session
        }
        
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }