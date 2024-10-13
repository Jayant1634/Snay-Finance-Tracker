import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { API_URL } from '../services/api';

function Predictions() {
  const [predictions, setPredictions] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetchPredictions();
    }
  }, []);

  const fetchPredictions = async () => {
    try {
      const res = await axios.get(API_URL +  `/predictions/${user.id}`);
      setPredictions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Spending Predictions</Card.Title>
          {predictions.length > 0 ? (
            <ListGroup>
              {predictions.map((prediction, index) => (
                <ListGroup.Item key={index}>
                  <strong>{prediction.month}</strong>: ${prediction.amount.toFixed(2)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No predictions available.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Predictions;
