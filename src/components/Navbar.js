import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <BootstrapNavbar className={styles.navbar} expand="lg" fixed="top">
      <Container>
        <BootstrapNavbar.Brand 
          onClick={() => navigate('/')} 
          className={styles.navBrand}
          style={{ cursor: 'pointer' }}
        >
          SnayExpTracker
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link 
              onClick={() => navigate('/')}
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/features')}
              className={`${styles.navLink} ${location.pathname === '/features' ? styles.active : ''}`}
            >
              Features
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate('/about')}
              className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
            >
              About
            </Nav.Link>
          </Nav>
          
          <div className={styles.authButtons}>
            <Button
              onClick={() => navigate('/login')}
              variant="outline-primary"
              className={styles.loginButton}
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate('/register')}
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
