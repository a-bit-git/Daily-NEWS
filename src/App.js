import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import About from './components/About';
import Help from './components/Help';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="newscard">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
