import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTransactionForm from './components/AddTransactionForm';
import FinancialGoals from './components/FinancialGoals';
import Predictions from './components/Predictions';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login is accessible at root */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransactionForm />} />
          <Route path="/goals" element={<FinancialGoals />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/login" element={<Login />} /> {/* Optional: Explicit login route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
