import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Navbar, Nav, Card } from 'react-bootstrap'; // Bootstrap components
import { FaWallet, FaChartLine, FaLightbulb } from 'react-icons/fa'; // Icons for feature cards
import FlaskImage from '../images/homePage.png'; // Assuming you have an image file named flask.png
import './HomePage.css'; // Custom CSS for futuristic styling

function HomePage() {
  const navigate = useNavigate();

  // Function to handle redirecting to login for logout
  const handleLogout = () => {
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="landing-page-bg">
      {/* Enhanced Navbar with Logout */}
      <Navbar expand="lg" className="mb-4 fixed-top enhanced-navbar">
        <Navbar.Brand href="/home" className="mx-3">
          SnayExpTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className="mx-3">Home</Nav.Link>
            <Nav.Link href="/dashboard" className="mx-3">Dashboard</Nav.Link>
            <Nav.Link href="/transactions" className="mx-3">Transactions</Nav.Link>
            <Nav.Link href="/predictions" className="mx-3">Predictions</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout} className="ms-3">
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Container className="d-flex align-items-center vh-100">
        <Row className="w-100">
          {/* Left column with the text content and arrows */}
          <Col xs={12} md={7} className="text-left position-relative">
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
          
          {/* Right column with the Flask image */}
          <Col xs={12} md={5} className="d-flex align-items-center justify-content-center mt-4 mt-md-0">
            <img src={FlaskImage} alt="Flask Logo" className="flask-image"/>
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
                <Button variant="primary" onClick={() => navigate("/transactions")} className="futuristic-button">
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
                <Button variant="primary" onClick={() => navigate("/dashboard")} className="futuristic-button">
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
                <Button variant="primary" onClick={() => navigate("/predictions")} className="futuristic-button">
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

export default HomePage;
