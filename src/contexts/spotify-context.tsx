'use client'

import { getCurrentUserTopArtists, getCurrentUserTopTracks, getCurrentUserTopAlbums } from '@/actions/spotify';
import { useSession } from "next-auth/react";
import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getUserAccessToken, logout } from '@/actions/auth';
import { ITopTracks } from '@/types/spotify/top-tracks';
import { ITopArtists } from '@/types/spotify/top-artists';
import { Item, AlbumItem, TopAlbumsResponse } from '@/types/spotify/top-albums';
import { dumbData } from '@/data/dumbdata';

interface SpotifyContextProps {
  datos: ITopTracks | ITopArtists | ITopAlbums; // Agrega ITopAlbums
  setDatos: React.Dispatch<React.SetStateAction<ITopTracks | ITopArtists | ITopAlbums>>;
  filterType: 'tracks' | 'artists' | 'albums'; // Agrega 'albums'
  setFilterType: React.Dispatch<React.SetStateAction<'tracks' | 'artists' | 'albums'>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dateRange: 'short_term' | 'medium_term' | 'long_term';
  setDateRange: React.Dispatch<React.SetStateAction<'short_term' | 'medium_term' | 'long_term'>>;
}

export const SpotifyContext = createContext<SpotifyContextProps>({
  datos: dumbData,
  setDatos: () => {},
  filterType: 'tracks',
  setFilterType: () => {},
  loading: false,
  setLoading: () => {},
  dateRange: 'short_term',
  setDateRange: () => {}
});

export const SpotifyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [datos, setDatos] = useState<ITopTracks | ITopArtists | ITopAlbums>(dumbData);
  const [filterType, setFilterType] = useState<'tracks' | 'artists' | 'albums'>('tracks');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');
  const { status } = useSession();

  const fetchDatos = useCallback(async () => {
    if (status !== 'authenticated') return;

    try {
      setLoading(true);
      const accessToken = await getUserAccessToken();
      if (!accessToken) throw new Error('No se pudo obtener el token de acceso');

      let data;
      if (filterType === 'tracks') {
        data = await getCurrentUserTopTracks(accessToken, dateRange);
      } else if (filterType === 'artists') {
        data = await getCurrentUserTopArtists(accessToken, dateRange);
      } else if (filterType === 'albums') {
        data = await getCurrentUserTopAlbums(accessToken, dateRange);
      }

      if (data && 'items' in data) {
        setDatos(data);
      } else {
        console.error('Estructura de datos inválida', data);
        setDatos(dumbData);
      }
    } catch (error) {
      console.error('Error al obtener datos de Spotify:', error);
      await logout();
      setDatos(dumbData);
    } finally {
      setLoading(false);
    }
  }, [filterType, status, dateRange]);

  useEffect(() => {
    fetchDatos();
  }, [fetchDatos]);

  const contextValue = useMemo(() => ({
    datos,
    setDatos,
    filterType,
    setFilterType,
    loading,
    setLoading,
    dateRange,
    setDateRange,
  }), [datos, filterType, loading, dateRange]);

  return (
    <SpotifyContext.Provider value={contextValue}>
      {children}
    </SpotifyContext.Provider>
  );
};