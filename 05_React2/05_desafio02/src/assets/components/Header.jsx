import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
    return (
        <>
        <Navbar bg="success" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link className="text-light" href="/">🏠Home</Nav.Link>
              <Nav.Link className="text-light" href="/favorites">⭐Favoritos</Nav.Link>
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