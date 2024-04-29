import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AppNavbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? "mx-2 text-danger" : "mx-2 text-light")
  return (
      <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand href="">
              <NavLink style={{ textDecoration: 'none' }} className={setActiveClass} to="/">🍕Pizzería Mamma Mía</NavLink>
            </Navbar.Brand>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <NavLink style={{ textDecoration: 'none' }} className={setActiveClass} to="/carrito">🛒$XXX.XXX</NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  )
};
export default AppNavbar;