import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const Formulario = ({ setShowAlert, setCorrectCreation }) => {
    const validarInput = (e) => {e.preventDefault()}
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passcheck, setPasscheck] = useState('');

function Registration() {
    setShowAlert(true)
    if ((name === '') || (email === '') || (pass === '') || (passcheck === '')) {console.log('Missing parameter')}
    else if (pass != passcheck) {console.log('Passwords dont match')}
    else {setCorrectCreation(true)}
}

return (
        <>
            <Form onSubmit={validarInput}>
                <Form.Text className="mb-3">O usa tu email para registrarte</Form.Text>
                <Form.Group className="mb-3" controlId="name"><Form.Control type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)}/></Form.Group>
                <Form.Group className="mb-3" controlId="email"><Form.Control type="email" placeholder="tuemail@ejemplo.com" onChange={(e) => setEmail(e.target.value)}/></Form.Group>
                <Form.Group className="mb-3" controlId="password"><Form.Control type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)}/></Form.Group>
                <Form.Group className="mb-3" controlId="confirmpassword"><Form.Control type="password" placeholder="Confirma tu contraseña" onChange={(e) => setPasscheck(e.target.value)} /></Form.Group>
                <Button variant="success" type="submit" onClick={() => Registration()}> Registrarse </Button>
            </Form>
            {name + email + pass + passcheck}
        </>
    )
};
export default Formulario;
