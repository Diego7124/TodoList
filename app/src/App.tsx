import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes como componente
import {Login} from '../src/Login';
import {Home} from '../src/Home'


function App() {
  return (
    <Router>
      <Routes> {}
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
