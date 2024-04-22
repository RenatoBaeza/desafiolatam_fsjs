import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <Link className="text-light" to="/">🍕Pizzería Mamma Mía</Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Link className="text-light" to="/carrito">🛒 $ 000.000 </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
};
export default Navbar;