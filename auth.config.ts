import type { NextAuthConfig, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Employee } from './app/lib/definitions';
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
async function getEmployee(email: string): Promise<Employee | undefined> {
  try {
    const employee = await sql<Employee>`SELECT * FROM employees WHERE email=${email}`;
    return employee.rows[0];
  } catch (error) {
    console.error('Failed to fetch employee:', error);
    throw new Error('Failed to fetch employee.');
  }
}


export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
      }
      return session;
    },
    signIn: async ({ user, account }) => {

      if (account?.provider === "google") {
        try {
          const email = user.email || '';
          let newUser = await getUser(email) || await getEmployee(email);
          console.log('newUser::: ', newUser);

          // Clear the user cookie first
          cookies().set('user', '');
          const hashedPassword = await bcrypt.hash(email, 10);
          if (newUser) {
            const serializedUser = JSON.stringify(newUser);
            cookies().set('user', serializedUser);
            return true;
          } else {
            await sql`
              INSERT INTO users (email, name, password)
              VALUES (${user.email}, ${user.name} , ${hashedPassword})

            `;
            // Fetch the newly created user to serialize and store in cookies
            newUser = await getUser(email);
            const serializedUser = JSON.stringify(newUser);
            cookies().set('user', serializedUser);
            return true;

          }
        } catch (error) {
          console.error('Error while creating user:', error);
          throw new Error("Error while creating user");
        }
      }

      return true;
    },
    authorized({ auth, request: { nextUrl } }) {

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },

  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;