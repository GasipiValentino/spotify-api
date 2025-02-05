export interface Item {
    id: string;
    name: string;
    album: AlbumItem; // El álbum al que pertenece la canción
    artists: { name: string }[]; // Los artistas de la canción
  }
  
  // Definir la interfaz para un ítem de álbum (AlbumItem)
  export interface AlbumItem {
    id: string;
    name: string;
    images: { url: string }[]; // Las imágenes del álbum
    artists: { name: string }[]; // Los artistas del álbum
  }
  
  // Definir la interfaz para la respuesta de los álbumes
  export interface ITopAlbums {
    items: AlbumItem[];
  }