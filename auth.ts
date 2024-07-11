import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Employee, User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';

 
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
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email) || await getEmployee(email);
            cookies().set('user', '')

            if (user && user.password) {
              const passwordsMatch = await bcrypt.compare(password, user.password);
              if (passwordsMatch) {
                // Set the user object in a cookie 
                const serializedUser = JSON.stringify(user);
                cookies().set('user', serializedUser);
                return user;
              }
            }
          }
        return null;
      },
    }),
  ],
});