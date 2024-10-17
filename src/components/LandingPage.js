import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Navbar, Nav } from 'react-bootstrap'; // Bootstrap components
import './LandingPage.css'; // Custom CSS for futuristic styling

function LandingPage() {
  const navigate = useNavigate();

  // Function to handle redirecting to the login page
  const redirectToLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="landing-page-bg">
      {/* Animated Transparent Navbar */}
      <Navbar expand="lg" className="navbar-transparent navbar-fixed-top animated-navbar">
        <Container>
          <Navbar.Brand href="#" className="text-white">Snay Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={redirectToLogin}>Login</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="d-flex align-items-center vh-100">
        <Row className="w-100">
          {/* Left column with the text content and arrows */}
          <Col md={8} className="text-left position-relative">
            <h1 className="display-4 text-white">Track Your Expenses Effortlessly</h1>
            <p className="lead text-white-50">
              Gain full control of your finances with real-time insights.
            </p>
            <p className="text-white-50">
              Join us to manage your expenses, set budgets, and achieve your financial goals with ease.
            </p>

            {/* Animated arrows pointing toward the login button */}
            <div className="arrow-container">
              <div className="arrow arrow-1"></div>
              <div className="arrow arrow-2"></div>
              <div className="arrow arrow-3"></div>
            </div>
          </Col>

          {/* Right column with the button */}
          <Col md={4} className="d-flex align-items-center justify-content-center">
            <Button onClick={redirectToLogin} variant="primary" className="mt-3 futuristic-button">
              Go to Login
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Footer with credits at the bottom right */}
      <div className="footer-credits">
        <p>Made by Snay Coorperation</p>
        <p>Owner: Jayant Khandelwal</p>
      </div>
    </div>
  );
}

export default LandingPage;
