import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (imageId) => {
    if (!favorites.includes(imageId)) {
        setFavorites([...favorites, imageId]);
        }
    };

    const removeFavorite = (imageId) => {
        setFavorites(favorites.filter((id) => id !== imageId));
    };

    return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
        {children}
    </FavoritesContext.Provider>
    );
};
