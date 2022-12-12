import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const Menu = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">DKMS Grooming Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user == null ? (
                <Link className="nav-link" to="/">
                  Login
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to="/Appointments">
                    Appointments
                  </Link>
                  <Link className="nav-link" to="/Owners">
                    Owners
                  </Link>
                  <Link className="nav-link" to="/Pets">
                    Pets
                  </Link>
                  <Link className="nav-link" to="/Logout">
                    Logout
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
