/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@foo.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!user) return null;

          const good = await compare(credentials.password, user.password);
          if (!good) return null;

          return {
            id: String(user.id),
            email: user.email,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    //   error: '/auth/error',
    //   verifyRequest: '/auth/verify-request',
    //   newUser: '/auth/new-user'
  },
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string | undefined,
          role: token.role as string | undefined,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as { id: string; role?: string };
        return {
          ...token,
          id: u.id,
          role: u.role,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
