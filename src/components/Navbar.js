import React from 'react';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css'; // Importing existing CSS module

function NavbarComponent() {
  // const navigate = useNavigate(); // Removed as it's no longer needed

  // const redirectToLogin = () => navigate('/login'); // Removed as it's no longer needed

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#" className={styles.navbarBrand}>
          SnayExpTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Removed the Log In button */}
            {/* Add additional navigation links here if needed */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
