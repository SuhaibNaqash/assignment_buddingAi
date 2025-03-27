import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductList from './components/ProductList';
import ProductDetailsPage from './components/ProductDetails';
import './components/styles/App.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;