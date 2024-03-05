import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import BaseColaboradores from "./BaseColaboradores";

const Formulario = ({ setShowAlert, setCorrectCreation }) => {
    const [id, setId] = useState(4);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');

    function Registration(e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        e.preventDefault()
        setShowAlert(true)
        if ((name === '') || (email === '') || (age === '') || (role === '')) {console.log('Missing parameter')}
        else if (!emailRegex.test(email)) {console.log('Invalid email')}
        else {
            setCorrectCreation(true)
            BaseColaboradores.push({id: id + 1
                                    , nombre: name
                                    , correo: email
                                    , edad: age
                                    , cargo: role
                                    , telefono: phone
                                    })
            }
    }    

    return (
        <>
            <Form onSubmit={Registration} className="mt-4">
                <h4>Ingresa un nuevo colaborador</h4>
                <Form.Group className="mb-3" controlId="name"><Form.Control type="text" placeholder="Nombre del colaborador..." onChange={(e) => setName(e.target.value)}/></Form.Group>
                <Form.Group className="mb-3" controlId="email"><Form.Control type="email" placeholder="E-mail del Colaborador..." onChange={(e) => setEmail(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3" controlId="age"><Form.Control type="number" placeholder="Edad del Colaborador..." onChange={(e) => setAge(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3" controlId="role"><Form.Control type="text" placeholder="Cargo del Colaborador..." onChange={(e) => setRole(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3" controlId="phone"><Form.Control type="number" placeholder="Teléfono del Colaborador..." onChange={(e) => setPhone(e.target.value)} /></Form.Group>
                <Button variant="success" type="submit"> Agregar Colaborador </Button>
            </Form>
        </>
    )
};
export default Formulario;
