/* eslint-disable arrow-body-style */
import { compare } from 'bcryptjs';
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
        console.log('=== AUTHORIZE CALLED ===');
        console.log('Email received:', credentials?.email);
        console.log('Password received:', credentials?.password ? `YES (length: ${credentials.password.length})` : 'NO');

        if (!credentials?.email || !credentials.password) {
          console.log(' Missing credentials');
          return null;
        }

        try {
          console.log('Querying database for:', credentials.email);

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          console.log('User found:', !!user);

          if (!user) {
            console.log(' No user with email:', credentials.email);
            return null;
          }

          console.log(' User exists:', {
            id: user.id,
            email: user.email,
            hasPassword: !!user.password,
            passwordPrefix: user.password?.substring(0, 7),
          });

          console.log(' Comparing passwords...');
          console.log('Input password:', credentials.password);
          console.log('Stored hash prefix:', user.password.substring(0, 20));

          const good = await compare(credentials.password, user.password);

          console.log(' Compare result:', good);

          if (!good) {
            console.log('Password mismatch!');

            // Test if "changeme" would work
            const testResult = await compare('changeme', user.password);
            console.log('Would "changeme" work?', testResult);

            return null;
          }

          console.log('✅ Authentication successful!');

          return {
            id: String(user.id),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          const err = error as Error;
          console.error('ERROR in authorize:', error);
          console.error('Error message:', err.message);
          console.error('Error stack:', err.stack);
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
