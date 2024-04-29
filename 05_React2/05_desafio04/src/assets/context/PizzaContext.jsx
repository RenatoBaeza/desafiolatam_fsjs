import React, { createContext, useState } from 'react';
export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [Pizza, setPizza] = useState([]);

    return (
        <PizzaContext.Provider value={{ Pizza, setPizza }}>
            {children}
        </PizzaContext.Provider>
    );
};

export default PizzaProvider;