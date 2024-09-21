import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, ListGroup, Button, Modal, Navbar, Nav, ToggleButtonGroup, ToggleButton, Row, Col, Form } from 'react-bootstrap';
import AddTransactionForm from './AddTransactionForm';
import FinancialGoals from './FinancialGoals';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    } 
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/transactions/${user.id}`);
      setTransactions(res.data);
      calculateTotalAmount(res.data);
      calculateCurrentBalance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotalAmount = (data) => {
    const total = data.reduce((sum, transaction) => sum + transaction.amount, 0);
    setTotalAmount(total);
  };

  const calculateCurrentBalance = (data) => {
    const totalIncome = data.filter(transaction => transaction.type === 'income').reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalExpenses = data.filter(transaction => transaction.type === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0);
    const balance = totalIncome - totalExpenses;
    setCurrentBalance(balance);
  };

  const handleAddMoneyModalShow = () => setShowAddMoneyModal(true);
  const handleAddMoneyModalClose = () => setShowAddMoneyModal(false);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const handleAddMoney = () => {
    const amount = parseFloat(addMoneyAmount);
    if (!isNaN(amount) && amount > 0) {
      setCurrentBalance(prev => prev + amount);
      setAddMoneyAmount(''); // Clear input field
      handleAddMoneyModalClose(); // Close modal after adding money
    }
  };

  return (
    <div className={theme}>
      {/* Navbar */}
      <Navbar bg={theme} variant={theme} expand="lg" className="mb-4">
        <Navbar.Brand href="/dashboard">SnayExpTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard" className="mx-3">Dashboard</Nav.Link>
          </Nav>
          <Nav className="ml-auto d-flex align-items-center">
            <Nav.Link href="/login" className="mx-3">Login</Nav.Link>
            <ToggleButtonGroup type="radio" name="theme-toggle" className="ml-3">
              <ToggleButton variant="outline-secondary" onClick={handleThemeToggle} value={theme}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <h2 className="my-4 text-center">Dashboard</h2>

        {/* Current Balance Card and Total Amount Spent Card */}
        <Row className="mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Current Balance</Card.Title>
                <Card.Text className="display-4">${currentBalance.toFixed(2)}</Card.Text>
                <Button variant="success" onClick={handleAddMoneyModalShow}>Add Money</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Total Amount Spent</Card.Title>
                <Card.Text className="display-4">${totalAmount.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => setShowModal(true)}>Add Transaction</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Transactions List */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Recent Transactions</Card.Title>
            {transactions.length > 0 ? (
              <ListGroup>
                {transactions.map((transaction) => (
                  <ListGroup.Item key={transaction._id}>
                    {transaction.category}: ${transaction.amount.toFixed(2)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No recent transactions.</p>
            )}
          </Card.Body>
        </Card>

        {/* Current Financial Goals Section */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Current Financial Goals</Card.Title>
            <FinancialGoals user={user} displayOnly />
            <Button variant="success" onClick={() => setShowGoalModal(true)}>
              Manage Goals
            </Button>
          </Card.Body>
        </Card>

        {/* Modals */}
        <Modal show={showAddMoneyModal} onHide={handleAddMoneyModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="addMoney">
              <Form.Control
                type="number"
                placeholder="Amount to Add"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddMoneyModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddMoney}>Add Money</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTransactionForm onClose={() => setShowModal(false)} />
          </Modal.Body>
        </Modal>

        <Modal show={showGoalModal} onHide={() => setShowGoalModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Manage Financial Goals</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FinancialGoals user={user} onGoalAdded={() => setShowGoalModal(false)} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
