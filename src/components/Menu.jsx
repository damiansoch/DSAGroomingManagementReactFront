import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const Menu = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
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

                  {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
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
