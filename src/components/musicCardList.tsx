'use client'
import { useContext, useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
} from "@/components/ui/carousel";
import { ITopTracks, Item as TrackItem } from "@/types/spotify/top-tracks";
import { ITopAlbums, AlbumItem } from "@/types/spotify/top-albums";
import { SpotifyContext } from "@/contexts/spotify-context";
import { ITopArtists, Item as ArtistItem } from "@/types/spotify/top-artists";
import SpotifyCard from "./spotifyCard";
import CarouselLoader from "./carouselLoader";

const MusicCardList = () => {
  const { datos, filterType, loading } = useContext(SpotifyContext);
  const [currentPreview, setCurrentPreview] = useState<HTMLAudioElement | null>(null);

  if (loading) return <CarouselLoader />;
  if (!datos || !("items" in datos)) return <p>Error al cargar los datos de Spotify</p>;

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
              // Verificar que la canción tenga un álbum con imágenes
              if (!item.album?.images?.length) return null;
              const artistName = item.artists?.[0]?.name || 'Unknown Artist';
              return (
                <SpotifyCard 
                  key={item.id} 
                  image={item.album.images[0].url} 
                  name={item.name}  
                  aditionalInfo={artistName}
                />
              );
            }).filter(Boolean)
          : filterType === 'artists'
          ? (datos as ITopArtists).items.map((item: ArtistItem) => {
              // Verificar que el artista tenga imágenes
              if (!item.images?.length) return null;
              const genre = item.genres?.[0] || 'Unknown Genre';
              return (
                <SpotifyCard 
                  key={item.id} 
                  image={item.images[0].url} 
                  name={item.name} 
                  aditionalInfo={genre} 
                />
              );
            }).filter(Boolean)
          : filterType === 'albums'
          ? (datos as ITopAlbums).items.map((item: AlbumItem) => {
              // Verificar que el álbum tenga imágenes
              if (!item.images?.length) return null;
              const artistName = item.artists?.[0]?.name || 'Unknown Artist';
              return (
                <SpotifyCard 
                  key={item.id} 
                  image={item.images[0].url} 
                  name={item.name} 
                  aditionalInfo={artistName} 
                />
              );
            }).filter(Boolean)
          : null // Si no hay un filtro válido, no mostrar nada
        }
      </CarouselContent>
    </Carousel>
  );
};

export default MusicCardList;