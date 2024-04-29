// PizzaContext.jsx
import React, { createContext, useState } from 'react';
export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzaname, setpizzaname] = useState([]);

    return (
        <PizzaContext.Provider value={{ pizzaname, setpizzaname }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;