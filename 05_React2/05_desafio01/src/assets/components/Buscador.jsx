import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Buscador = ({ setSearchTerm }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSearchTerm(inputValue); 
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-4">
            <h4>Busca un juego</h4>
            <Form.Control type="text" placeholder="Busca un juego..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <Button className="my-2" variant="success" type="submit"> Buscar </Button>
        </Form>
    );
};

export default Buscador;