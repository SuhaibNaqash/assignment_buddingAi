import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');
  const [viewMode, setViewMode] = useState('card');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      result = result.filter(product => product.category === category);
    }

    // Sort products
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating_asc':
        result.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, searchTerm, sortBy, category]);

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      loading,
      error,
      searchTerm,
      setSearchTerm,
      sortBy,
      setSortBy,
      category,
      setCategory,
      viewMode,
      setViewMode
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);