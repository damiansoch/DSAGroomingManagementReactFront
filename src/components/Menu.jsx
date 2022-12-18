import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';
import { useState } from 'react';

const Menu = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  //checking if user is admin
  const adminOptions = () => {
    const rolesArray =
      user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (rolesArray.includes('writer')) {
      return (
        <NavDropdown title="Admin" id="basic-nav-dropdown" className="mx-5">
          <NavDropdown.Item href="#action/3.2">
            <Link className="nav-link text-black" to="/Users">
              Users
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            <Link className="nav-link text-black" to="/Users/AddUser">
              Add user
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  };
  //---------------------------
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">DKMS Grooming Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user == null ? (
                <Link className="nav-link " to="/">
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
                  {user[
                    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                  ] && adminOptions()}
                  <Link className="nav-link ms-5" to="/Logout">
                    Logout
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>

        {user !== null && user !== undefined ? (
          <p className="text-white mx-2 text-muted">
            Welcome{' '}
            {
              user[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
              ]
            }
          </p>
        ) : (
          <p className="text-white mx-2 text-muted">Please Log In</p>
        )}
      </Navbar>
    </>
  );
};

export default Menu;
