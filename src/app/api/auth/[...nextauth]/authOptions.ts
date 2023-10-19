import {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {prisma} from '@/libs/prisma';
import {compare} from 'bcrypt';
import {PrismaAdapter} from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials, req) {
                // const user = { id: '1', name: 'Anderson', email: 'anderson@email.com'}
                // return user;
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                const existingUser = await prisma.users.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(
                    credentials.password,
                    existingUser.password,
                );

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    name: existingUser.name,
                    email: existingUser.email,
                };
            },
        }),
    ],
    callbacks: {
        jwt: ({token, user}) => {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                };
            }
            return token;
        },
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                },
            };
        },
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
};
