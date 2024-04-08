import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites();
    
    return (
        <>
        <h1 className="text-success">Favorites</h1>
            {favorites.map((photo) => (
                            <img onClick={() => removeFavorite(photo.id)} 
                                key={photo.id} 
                                className="m-2" 
                                src={photo.src.medium}
                                />
                    )
                )
            }
        </>
    )
};
export default Favorites;