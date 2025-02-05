'use client'
import { useContext } from "react"
import { 
  Carousel, 
  CarouselContent, 
} from "@/components/ui/carousel"
import { ITopTracks, Item as TrackItem } from "@/types/spotify/top-tracks"
import { SpotifyContext } from "@/contexts/spotify-context"
import { ITopArtists, Item as ArtistItem } from "@/types/spotify/top-artists"
import SpotifyCard from "./spotifyCard"
import CarouselLoader from "./carouselLoader"

const MusicCardList = () => {
  const { datos, filterType, loading } = useContext(SpotifyContext);

  if (loading) return <CarouselLoader />

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full cursor-grab"
    >
      <CarouselContent className="-ml-4">
        {filterType === 'tracks' 
          ? (datos as ITopTracks).items.map((item: TrackItem) => {
              if (!item.album || !item.album.images || !item.album.images.length) return null;
              return (
                <SpotifyCard 
                  key={item.id} 
                  image={item.album.images[0].url} 
                  name={item.album.name} 
                  aditionalInfo={item.album.artists[0]?.name || 'Unknown Artist'} 
                />
              )
            }).filter(Boolean)
          : (datos as ITopArtists).items.map((item: ArtistItem) => {

              if (!item.images || !item.images.length) return null;
              return (
                <SpotifyCard 
                  key={item.id} 
                  image={item.images[0].url} 
                  name={item.name} 
                  aditionalInfo={item.genres?.[0] || 'Unknown Genre'} 
                />
              )
            }).filter(Boolean)
        }
      </CarouselContent>
    </Carousel>
  )
}

export default MusicCardList