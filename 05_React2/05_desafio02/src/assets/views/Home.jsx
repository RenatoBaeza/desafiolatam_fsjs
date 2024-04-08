import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useFavorites } from "../context/FavoritesContext"

const Home = () => {
    const config = {
        method: 'get',
        url: 'https://api.pexels.com/v1/curated/',
        headers: {'Authorization': import.meta.env.VITE_PEXELS_KEY}
    };

    React.useEffect(() => {
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setResponseData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [responseData, setResponseData] = React.useState(null);
    const { addFavorite } = useFavorites();

    return (
        <div>
            <h1 className="text-success">Natural Pic</h1>
            {responseData ? (
                <div>
                    {
                    responseData.photos.map((photo) => (
                        <img onClick={() => addFavorite(photo)} 
                                key={photo.id} 
                                className="m-2" 
                                src={photo.src.medium}/>
                            )
                        )
                    }
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Home;