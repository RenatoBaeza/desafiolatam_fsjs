import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

const Home = () => {
    return (
        <div>
            <h1 className="text-danger">¡Bienvenido, Maestro Pokémon!</h1>
            <img src="https://i.pinimg.com/originals/f3/e1/b8/f3e1b8019f160f88531d8af792716b4f.png" width="200" className="" alt="Pikachu Icon"/>
        </div>
    );
};

export default Home;