import React, { createContext, useState, useContext } from 'react';

export const FavoritesContext = createContext();

export function useFavorites() {
    return useContext(FavoritesContext);
}

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (image) => {
    if (!favorites.find((fav) => fav.id === image.id)) {
        setFavorites([...favorites, image]);
    }
    };

    const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
    };

    return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
        {children}
    </FavoritesContext.Provider>
    );
};