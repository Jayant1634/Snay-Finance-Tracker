import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

function AddTransactionForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.id) {
      alert('User not found. Please log in again.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/transactions', {
        userId: user.id,
        category,
        amount: parseFloat(amount),
        date,
      });
      alert('Transaction added successfully');
      setCategory('');
      setAmount('');
      setDate('');
    } catch (err) {
      console.error(err);
      alert(`Failed to add transaction: ${err.response?.data?.message || 'An error occurred'}`);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Add Transaction</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategory">
            <Form.Label>Category:</Form.Label>
            <Form.Control 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Transaction
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddTransactionForm;
