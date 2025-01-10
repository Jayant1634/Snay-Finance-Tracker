import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ onHomeClick, onDashboardClick, onProfileClick }) {
  return (
    <BootstrapNavbar className={styles.navbar} expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className={styles.navBrand}>
          FinanceTracker
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/features" className={styles.navLink}>
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.navLink}>
              About
            </Nav.Link>
          </Nav>
          <div className={styles.authButtons}>
            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              className={styles.loginButton}
            >
              Log In
            </Button>
            <Button
              as={Link}
              to="/register"
              variant="primary"
              className={styles.signupButton}
            >
              Sign Up
            </Button>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
