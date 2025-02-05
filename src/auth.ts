import NextAuth from "next-auth"
import { Provider } from "next-auth/providers"
import spotify from "next-auth/providers/spotify"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

export interface ISession extends Session {
  accessToken?: string
}

interface IJWT extends JWT {
  accessToken?: string
}

// const scopes = [
//   "user-read-email",
//   "playlist-read-private",
//   "playlist-modify-private",
//   "playlist-modify-public",
//   "user-read-private",
//   "user-library-read",
//   "user-library-modify",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "streaming",
//   "user-top-read"
// ].join(" ")

const providers: Provider[] = [
  spotify({
    clientId: process.env.AUTH_SPOTIFY_ID,
    clientSecret: process.env.AUTH_SPOTIFY_SECRET,
    authorization: {
      url: "https://accounts.spotify.com/authorize",
      params: { scope: "user-top-read" }
    }
  })
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.provider === "spotify") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }: { session: ISession, token: IJWT }) {
      session.accessToken = token.accessToken
      return session
    }
  }
});