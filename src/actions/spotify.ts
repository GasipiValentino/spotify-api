'use server'

import axios from "axios"
import { Item } from "@/types/spotify/top-tracks"
import { AlbumItem, ITopAlbums } from "../types/spotify/top-albums"

const SPOTIFY_TOKEN_URI = "https://accounts.spotify.com/api/token"
const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1"

export interface AccessTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export const getSpotifyToken = async (): Promise<AccessTokenResponse> => {

  const response = await axios.post(SPOTIFY_TOKEN_URI, {
    grant_type: "client_credentials",
    client_id: process.env.AUTH_SPOTIFY_ID,
    client_secret: process.env.AUTH_SPOTIFY_SECRET
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  return response.data as AccessTokenResponse
}

export const getCurrentUserTopTracks = async (access_token: string, time_range?: "short_term" | "medium_term" | "long_term") => {
  const response = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/tracks?time_range=${time_range}&limit=50`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })

  return response.data
}

export const getCurrentUserTopArtists = async (access_token: string, time_range?: "short_term" | "medium_term" | "long_term") => {
  const response = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/artists?time_range=${time_range}&limit=30`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  return response.data
}

export const getCurrentUserTopAlbums = async (
  access_token: string,
  time_range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
): Promise<ITopAlbums> => {
  // Obtener las canciones más escuchadas del usuario
  const response = await axios.get(`${SPOTIFY_ENDPOINT}/me/top/tracks?time_range=${time_range}&limit=20`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  // Extraer las canciones de la respuesta
  const tracks: Item[] = response.data.items;

  // Filtrar solo las canciones que tienen un álbum válido
  const validAlbums: AlbumItem[] = tracks
    .map((track: Item) => track.album) // Extraer los álbumes de las canciones
    .filter((album: AlbumItem) => {
      // Filtrar solo los álbumes que tienen un ID, nombre e imágenes
      return album.id && album.name && album.images && album.images.length > 0;
    });

  // Eliminar álbumes duplicados (basado en el ID del álbum)
  const uniqueAlbums: AlbumItem[] = validAlbums.filter(
    (album: AlbumItem, index: number, self: AlbumItem[]) =>
      index === self.findIndex((a: AlbumItem) => a.id === album.id)
  );

  // Devolver los álbumes únicos y válidos
  return { items: uniqueAlbums };
};