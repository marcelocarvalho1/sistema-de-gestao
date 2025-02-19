import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Produtos from '../src/components/Produtos';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Sistema de Gestão</h1>
        <Routes>
          <Route path="/" element={<Produtos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
