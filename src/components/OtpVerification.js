import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { API_URL } from "../services/api";
import styles from "./OtpVerification.module.css"; // Import CSS Module
import otpImage from "../images/otp-verification.png"; // Replace with the path to your image

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendDisabled, setresendDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get email from location state

  useEffect(() => {
    setTimeout(() => {
      setresendDisabled(false);
    }, 30000);
  }, []);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await axios.post(API_URL + "/users/verify-otp", {
        email,
        otp,
      });
      if (data.data.id) {
        setMessage("OTP verified successfully.");
        navigate("/login"); // Redirect to login page after successful OTP verification
      }
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    }
  };

  const resendOTP = async () => {
    try {
      const response = await axios.post(API_URL + "/users/resend-otp", { email });
      if (response.data.message) {
        setMessage(response.data.message);
        setresendDisabled(true);
        setTimeout(() => {
          setresendDisabled(false);
        }, 30000);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to resend OTP. Please try again later.");
    }
  };

  return (
    <Container className={styles.otpVerificationContainer}>
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="d-none d-md-block">
          <img src={otpImage} alt="OTP Illustration" className={styles.otpVerificationImage} />
        </Col>
        <Col md={6}>
          <h2 className="text-center">OTP Verification</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleOtpSubmit} className={styles.otpVerificationForm}>
            <Form.Group controlId="formBasicOtp">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter the OTP sent to your email"
                className="py-2"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4 py-2">
              Verify OTP
            </Button>

            <Button variant="link" className="mt-3" disabled={resendDisabled} onClick={resendOTP}>
              Resend OTP
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default OtpVerification;
