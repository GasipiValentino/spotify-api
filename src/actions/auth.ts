'use server'

import { auth, ISession, signIn, signOut } from "@/auth";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  console.log('logged in')
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  console.log('logged out')
}

export const getUserAccessToken = async () => {
  const session = await auth() as ISession
  return session.accessToken
}