import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

const Contact = () => {
    return (
        <>
            <Form>
                <h4>Cuéntanos, ¿en qué te podemos ayudar?</h4>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu correo electrónico..."/>
                <Form.Label>Mensaje</Form.Label>
                <Form.Control type="text" placeholder="Déjanos un mensaje..."/>
                <Button className='bg-danger m-2'>Enviar</Button>
            </Form>
        </>
    )
};
export default Contact;