'use server'

import { auth, signIn, signOut } from "@/auth";

export const login = async (provider: string): Promise<void> => {
  await signIn(provider, { redirectTo: "/" });
  console.log('logged in')
}

export const logout = async (): Promise<void> => {
  await signOut({ redirectTo: "/" });
  console.log('logged out')
}