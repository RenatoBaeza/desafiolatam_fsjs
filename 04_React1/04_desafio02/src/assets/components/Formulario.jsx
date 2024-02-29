/* eslint-disable react/prop-types */
import { Form, Button } from "react-bootstrap";

const Formulario = () => {
    return (
        <>
            <Form>
                <Form.Text className="mb-3">O usa tu email para registrarte</Form.Text>
                <Form.Group className="mb-3" controlId="name"><Form.Control type="text" placeholder="Nombre" /></Form.Group>
                <Form.Group className="mb-3" controlId="email"><Form.Control type="email" placeholder="tuemail@ejemplo.com" /></Form.Group>
                <Form.Group className="mb-3" controlId="password"><Form.Control type="password" placeholder="Contraseña" /></Form.Group>
                <Form.Group className="mb-3" controlId="confirmpassword"><Form.Control type="password" placeholder="Confirma tu contraseña" /></Form.Group>
                <Button variant="success" type="submit"> Registrarse </Button>
            </Form>
        </>
    )
};
export default Formulario;
