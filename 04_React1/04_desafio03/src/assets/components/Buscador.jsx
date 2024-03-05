import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Buscador = ({ setSearchTerm }) => {
    return (
        <>
            <Form className="mt-4">
                <h4>Busca un colaborador</h4>
                <Form.Control type="text" 
                                placeholder="Busca un colaborador..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                                />
            </Form>
        </>
    );
};

export default Buscador;
