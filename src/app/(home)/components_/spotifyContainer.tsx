import { auth } from "@/auth"
import MusicCardList from "@/components/musicCardList"
import SpotifyHeader from "@/components/spotifyHeader"
import SpotifyRangeDate from "@/components/spotifyDateRange"
import { SpotifyContextProvider } from "@/contexts/spotify-context"
import { SessionProvider } from "next-auth/react"

const SpotifyContainer = async () => {

  const session = await auth()

  return (
    <SessionProvider>
      <SpotifyContextProvider>
        <div className='w-full flex flex-col flex-1 h-full bg-gradient-to-l from-green-100 to-emerald-300 rounded-3xl gap-4 overflow-hidden p-2'>
          <SpotifyHeader session={session} />
          <div className='flex-1 flex items-center'>
            <MusicCardList />
          </div>
          <SpotifyRangeDate session={session} />
        </div>
      </SpotifyContextProvider>
    </SessionProvider>
  )
}

export default SpotifyContainer