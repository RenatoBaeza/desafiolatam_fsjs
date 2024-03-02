/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";

const Formulario = () => {
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="name"><Form.Control type="text" placeholder="Nombre del colaborador..." /></Form.Group>
                <Form.Group className="mb-3" controlId="email"><Form.Control type="email" placeholder="E-mail del Colaborador..." /></Form.Group>
                <Form.Group className="mb-3" controlId="email"><Form.Control type="number" placeholder="Edad del Colaborador..." /></Form.Group>
                <Form.Group className="mb-3" controlId="email"><Form.Control type="text" placeholder="Cargo del Colaborador..." /></Form.Group>
                <Button variant="success" type="submit"> Agregar Colaborador </Button>
            </Form>
        </>
    )
};
export default Formulario;
