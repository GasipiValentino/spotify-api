'use server'

import { auth, ISession, signIn, signOut } from "@/auth";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
}

export const getUserAccessToken = async () => {
  const session = await auth() as ISession
  return session.accessToken
}