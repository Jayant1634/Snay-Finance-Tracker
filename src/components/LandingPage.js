import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Navbar, Nav, Card } from 'react-bootstrap'; // Bootstrap components
import { FaWallet, FaChartLine, FaLightbulb } from 'react-icons/fa'; // Icons for feature cards
import './LandingPage.css'; // Custom CSS for futuristic styling

function LandingPage() {
  const navigate = useNavigate();

  // Function to handle redirecting to the login and signup pages
  const redirectToSignup = () => {
    navigate('/register'); // Redirect to signup page
  };
  const redirectToLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="landing-page-bg">
     {/* Animated Transparent Navbar */}
      <Navbar expand="lg" className="navbar-transparent navbar-fixed-top animated-navbar">
        <Container>
          {/* Brand aligned to the left */}
          <Navbar.Brand href="#" className="text-white">
            Snay Expense Tracker
          </Navbar.Brand>

          {/* Navbar toggle button for mobile view */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar items and alignment */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {/* Empty Nav to push login button to the far right */}
            </Nav>
            {/* Log In button aligned to the far right */}
            <Nav>
              <Button variant="outline-light" className="mx-2" onClick={redirectToLogin}>
                Log In
              </Button>
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

          {/* Right column with the Login and Signup buttons */}
          <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
            
            <Button onClick={redirectToSignup} variant="outline-primary" className="mt-2 futuristic-button">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Feature Cards */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4}>
            <Card className="mb-4 feature-card futuristic-card">
              <Card.Body>
                <FaWallet className="feature-icon animated-icon" />
                <Card.Title>Manage Transactions</Card.Title>
                <Card.Text>
                  Add, view, and filter your daily expenses and incomes in a simple, intuitive interface.
                </Card.Text>
                <Button variant="primary" onClick={redirectToLogin} className="futuristic-button">
                View Transactions
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="mb-4 feature-card futuristic-card">
              <Card.Body>
                <FaChartLine className="feature-icon animated-icon" />
                <Card.Title>Dashboard Overview</Card.Title>
                <Card.Text>
                  Get a quick overview of your current balance and spending patterns in the dashboard.
                </Card.Text>
                <Button variant="primary" onClick={redirectToLogin} className="futuristic-button">
                Go to Dashboard
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="mb-4 feature-card futuristic-card">
              <Card.Body>
                <FaLightbulb className="feature-icon animated-icon" />
                <Card.Title>Expense Predictions</Card.Title>
                <Card.Text>
                  Use advanced algorithms to predict your future expenses and plan ahead.
                </Card.Text>
                <Button variant="primary" onClick={redirectToLogin} className="futuristic-button">
                See Predictions
                </Button>
              </Card.Body>
            </Card>
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
