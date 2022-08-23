import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Reports from './pages/Reports';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar.js';
import Documents from './components/Documents/Documents';

function App() {
  return (
    <Router>
      <Navbar>
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/reports' element={<Reports />}/>
          <Route path='/documents' element={<Documents />}/>
          <Route path='/products' element={<Products />}/>
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
