import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <Navbar bg="success" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <Link className="text-light mx-3" to="/">🏠Home</Link>
              <Link className="text-light" to="/favorites">⭐Favoritos</Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="text-light">🌱Natural Pic</Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
};
export default Header;