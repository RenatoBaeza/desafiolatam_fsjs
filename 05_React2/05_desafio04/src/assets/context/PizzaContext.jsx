// PizzaContext.jsx
import React, { createContext, useState } from 'react';
export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzaname, setpizzaname] = useState('');
    const [carrito, setCarrito] = useState([]);

    return (
        <PizzaContext.Provider value={{ pizzaname, setpizzaname, carrito, setCarrito }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;