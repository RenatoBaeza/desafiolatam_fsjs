import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <Navbar bg="danger" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <Navbar.Brand href="">
                <img src="https://cdn-icons-png.flaticon.com/512/868/868596.png" width="50" height="50" className="d-inline-block align-top" alt="Pokeball Icon"/>
              </Navbar.Brand>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Link className="text-light mx-3" to="/">Home</Link>
              <Link className="text-light" to="/pokemon">Pokémon List</Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
};
export default Header;