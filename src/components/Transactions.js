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
} from "react-bootstrap";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa"; // Importing icons
import { API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Transactions.css";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter((transaction) =>
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, transactions]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL + `/transactions/${user.id}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`transactions-page ${theme}`}>
      {/* Navbar */}
      <Navbar bg={theme} variant={theme} expand="lg" className="mb-4">
        <Navbar.Brand href="/dashboard" className="mx-3">
          SnayExpTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className="mx-3">
              Home
            </Nav.Link>
            <Nav.Link href="/dashboard" className="mx-3">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/transactions" className="mx-3">
              Transactions
            </Nav.Link>
            <Nav.Link href="/predictions" className="mx-3">
              Predictions
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Transactions"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success">
              <FaSearch /> {/* Search icon */}
            </Button>
          </Form>
          <ToggleButtonGroup
            type="radio"
            name="theme-toggle"
            className="ms-3" // Added margin-start here for spacing
          >
            <ToggleButton
              variant="outline-secondary"
              onClick={handleThemeToggle}
              value={theme}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />} {/* Moon and Sun icons */}
            </ToggleButton>
          </ToggleButtonGroup>
        </Navbar.Collapse>
      </Navbar>

      {/* Transactions Table */}
      <Container className={`transactions-container ${theme}`}>
        <h2 className="my-4 text-center">All Transactions</h2>
        <Table striped bordered hover variant={theme}>
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{indexOfFirstTransaction + index + 1}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.type}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination className="justify-content-center">
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
}

export default TransactionsPage;
