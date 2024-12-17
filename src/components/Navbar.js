import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function AppNavbar({ onHomeClick, onDashboardClick, onProfileClick }) {
  return (
    <Navbar className={`${styles.navbar} fixed-top`} expand="lg" style={{ fontSize: '1.2rem', color: 'white' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>SnayExpTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.nav} ms-auto align-items-center`}>
            <Nav.Link onClick={onHomeClick} className="flex-fill text-center">Home</Nav.Link>
            <Nav.Link onClick={onDashboardClick} className="flex-fill text-center">Dashboard</Nav.Link>
            <Nav.Link onClick={onProfileClick} className="flex-fill text-center">Profile</Nav.Link>
          </Nav>
          <div className="d-flex ms-auto">
            <Button variant="primary" className="ms-2" onClick={onHomeClick}>
              Sign Up
            </Button>
            <Button variant="secondary" className="ms-2" onClick={onHomeClick}>
              Log In
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
