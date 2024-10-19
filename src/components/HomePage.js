import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { FaChartLine, FaWallet, FaLightbulb, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={`home-page ${theme}`}>
      {/* Navbar */}
      <Navbar bg={theme} variant={theme} expand="lg" className="mb-4 fixed-top enhanced-navbar">
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
          <ToggleButtonGroup type="radio" name="theme-toggle" className="ms-3">
            <ToggleButton variant="outline-secondary" onClick={handleThemeToggle} value={theme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="outline-danger" onClick={handleLogout} className="ms-3">
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <Container className="text-center main-content">
        <h1 className="mb-4 animated-text">Welcome to SnayExpTracker!</h1>
        <p className="lead mb-5 animated-subtext">
          Track your expenses, monitor your spending habits, and get insightful predictions for better financial planning.
        </p>
        
        {/* Feature Cards */}
        <Row className="justify-content-center">
          <Col md={4}>
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
          <Col md={4}>
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
          <Col md={4}>
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
    </div>
  );
}

export default HomePage;
