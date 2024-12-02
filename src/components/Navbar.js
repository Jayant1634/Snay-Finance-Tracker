import React from 'react';
import { Container, Navbar, Nav, ToggleButtonGroup, ToggleButton, Dropdown } from 'react-bootstrap'; // Added ToggleButtonGroup, ToggleButton, Dropdown
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FaMoon, FaSun } from 'react-icons/fa'; // Added icons
import styles from './LandingPage.module.css'; // Importing existing CSS module

function NavbarComponent({ theme, handleThemeToggle, user }) { // Added props for theme and user
  const navigate = useNavigate(); // Added navigate

  return (
    <Navbar bg={theme} variant={theme} expand="lg" className="mb-4 fixed-top enhanced-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="mx-3">
          SnayExpTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link as={Link} to="/home" className="mx-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="mx-3">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/transactions" className="mx-3">Transactions</Nav.Link>
            <Nav.Link as={Link} to="https://expenseandstocks.streamlit.app" className="mx-3">Predictions</Nav.Link>
            <Nav.Link as={Link} to="/login" className="mx-3">LogOut</Nav.Link>
          </Nav>
          
          <div className="navbar-controls ml-auto">
            <ToggleButtonGroup
              type="radio"
              name="theme-toggle"
              className="ml-3"
            >
              <ToggleButton
                variant="outline-secondary"
                onClick={handleThemeToggle}
                value={theme}
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </ToggleButton>
            </ToggleButtonGroup>
            <Dropdown className="ms-3">
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                {user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { localStorage.removeItem("user"); navigate("/"); }}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
