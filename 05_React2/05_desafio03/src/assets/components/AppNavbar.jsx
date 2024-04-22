import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const AppNavbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? "mx-2 text-primary" : "mx-2 text-light")
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
            <NavLink style={{ textDecoration: 'none' }} className={setActiveClass} to="/">Home</NavLink>
            <NavLink style={{ textDecoration: 'none' }} className={setActiveClass} to="/pokemon">Pokémon List</NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  )
};
export default AppNavbar;