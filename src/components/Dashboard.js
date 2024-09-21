import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Card, Container, ListGroup, Button, Modal, Navbar, Nav, ToggleButtonGroup, ToggleButton, Row, Col, Form } from 'react-bootstrap';
import AddTransactionForm from './AddTransactionForm';
import FinancialGoals from './FinancialGoals';
import Predictions from './Predictions';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false); // New state for Add Money modal
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchTransactions();
  }, [navigate, user]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/transactions/${user._id}`);
      setTransactions(res.data);
      prepareChartData(res.data);
      calculateTotalAmount(res.data);
      calculateCurrentBalance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const prepareChartData = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      setChartData({});
      return;
    }
    const categories = {};
    data.forEach((transaction) => {
      const category = transaction.category;
      categories[category] = (categories[category] || 0) + transaction.amount;
    });

    setChartData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(categories),
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    });
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

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    fetchTransactions();
  };

  const handleGoalShow = () => setShowGoalModal(true);
  const handleGoalClose = () => {
    setShowGoalModal(false);
  };

  const handleAddMoneyModalShow = () => setShowAddMoneyModal(true); // Open Add Money modal
  const handleAddMoneyModalClose = () => setShowAddMoneyModal(false); // Close Add Money modal

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
      setTotalAmount(prev => prev + amount); // Optionally add to total amount spent
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
        <Nav className="mr-auto"> {/* Aligns the title and dashboard to the left */}
          <Nav.Link href="/dashboard" className="mx-3">Dashboard</Nav.Link>
        </Nav>
        <Nav className="ml-auto d-flex align-items-center"> {/* Aligns login and theme toggle to the right */}
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
                <Button variant="success" onClick={handleAddMoneyModalShow} >Add Money</Button> {/* Button to open modal */}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Total Amount Spent</Card.Title>
                <Card.Text className="display-4">${totalAmount.toFixed(2)}</Card.Text>
                {/* Add Transaction Button */}
                <Button variant="primary" onClick={handleShow} >Add Transaction</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Expenses by Category Chart */}
        {chartData.labels && chartData.labels.length > 0 ? (
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Expenses by Category</Card.Title>
              <Bar data={chartData} />
            </Card.Body>
          </Card>
        ) : (
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>No Data Available</Card.Title>
              <p>No data available for the chart.</p>
            </Card.Body>
          </Card>
        )}

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
            <Button variant="success" onClick={handleGoalShow}>
              Manage Goals
            </Button>
          </Card.Body>
        </Card>

        {/* Modal for Managing Financial Goals */}
        <Modal show={showGoalModal} onHide={handleGoalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Manage Financial Goals</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FinancialGoals user={user} onGoalAdded={handleGoalClose} />
          </Modal.Body>
        </Modal>

        {/* Predictions Section */}
        <Predictions transactions={transactions} />

        {/* Modal for Adding Money */}
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

        {/* Modal for Adding Transaction */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTransactionForm onClose={handleClose} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
