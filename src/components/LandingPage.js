import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap'; // Removed Navbar and Nav imports
import { FaWallet, FaChartLine, FaLightbulb } from 'react-icons/fa';
import Lottie from 'react-lottie';
import animationData from '../lottie_animations/landingPage.json';
import styles from './LandingPage.module.css';
import Navbar from './Navbar'; // Import the Navbar component

function LandingPage() {
  const navigate = useNavigate();

  const redirectToSignup = () => navigate('/register');
  const redirectToLogin = () => navigate('/login');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={styles.landingPage}>
      <Navbar /> {/* Insert the Navbar component */}
      
      <div className={styles.heroSection}>
        <Container className="d-flex align-items-center vh-100">
          <Row className="w-100 align-items-center">
            <Col md={6} className="text-left order-md-1 order-2">
              <h1 className={styles.heroTitle}>Track Your Expense Effortlessly</h1>
              <p className={styles.heroSubtitle}>Gain full control of your finances with real-time insights.</p>
              <div className={`${styles.buttonGroup} d-flex justify-content-end`}>
                <Button onClick={redirectToSignup} variant="primary" className={`${styles.signupButton} mt-3`}>
                  Sign Up
                </Button>
                <Button onClick={redirectToLogin} variant="secondary" className={`${styles.loginButton} mt-3 ms-3`}>
                  Log In
                </Button>
              </div>
              <div className={styles.arrowDown}></div>
            </Col>
            <Col md={6} className="order-md-2 order-1">
              <Lottie options={defaultOptions} height="100%" width="100%" />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className={`${styles.featureCardsSection} my-5`}>
        <Row className="justify-content-center">
          {[{
            icon: <FaWallet />,
            title: 'Manage Transactions',
            text: 'Add, view, and filter your daily expenses and incomes in a simple, intuitive interface.',
            btnText: 'View Transactions'
          }, {
            icon: <FaChartLine />,
            title: 'Dashboard Overview',
            text: 'Get a quick overview of your current balance and spending patterns in the dashboard.',
            btnText: 'Go to Dashboard'
          }, {
            icon: <FaLightbulb />,
            title: 'Expense Predictions',
            text: 'Use advanced algorithms to predict your future expenses and plan ahead.',
            btnText: 'See Predictions'
          }].map((feature, idx) => (
            <Col xs={12} sm={6} md={4} className="mb-4" key={idx}>
              <Card className={styles.featureCard}>
                <Card.Body>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.text}</Card.Text>
                  <Button variant="primary" onClick={redirectToLogin} className="mt-3">{feature.btnText}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className={`${styles.footerSection} text-center py-3`}>
        <Container className={styles.footcont}>
          <p>Made by Snay Corporation | Owner : Jayant Khandelwal</p>
        </Container>
      </footer>
    </div>
  );
}

export default LandingPage;

/* Changes in LandingPage.js */

/* No additional changes needed as feature card sizes and spacing are handled via CSS */
