import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
  Dropdown, // Add Dropdown import
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { FaSearch, FaSun, FaMoon, FaSort, FaSortUp, FaSortDown, FaPlus, FaFilter } from "react-icons/fa"; // Importing icons
import { API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Transactions.css";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL + `/transactions/${user.id}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (transaction.description && transaction.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter ? transaction.type === typeFilter : true;
    const matchesCategory = categoryFilter ? transaction.category === categoryFilter : true;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(transactions.map(t => t.category))];

  // Pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="transactions-page">
      <Navbar expand="lg" className="navbar-custom">
        <Navbar.Brand href="/dashboard">
          SnayExpTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="https://expenseandstocks.streamlit.app">Predictions</Nav.Link>
          </Nav>
          
          <Dropdown>
            <Dropdown.Toggle className="user-dropdown">
              {user.username}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={() => { localStorage.removeItem("user"); navigate("/"); }}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>

      <div className="main-content">
        <div className="page-header">
          <h1>Transactions</h1>
        </div>

        <div className="content-wrapper">
          {/* Filters */}
          <div className="filters">
            <Row className="g-3">
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <Table hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`transaction-badge badge-${transaction.type}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td>{transaction.category}</td>
                    <td className={`amount-${transaction.type}`}>
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td>{transaction.description || '-'}</td>
                    <td>
                      <Button 
                        className="delete-button"
                        size="sm"
                        onClick={() => {/* delete handler */}}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="pagination-wrapper">
            <Pagination>
              {Array.from({ length: Math.ceil(filteredTransactions.length / transactionsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;
