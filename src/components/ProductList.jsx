import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import './styles/ProductList.css';

const ProductList = () => {
  const {
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
  } = useProductContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const categories = [...new Set(filteredProducts.map(p => p.category))];

  return (
    <div>
      <div className="product-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_asc">Rating: Low to High</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>

        <div className="view-toggle">
          <button 
            onClick={() => setViewMode('card')}
            className={viewMode === 'card' ? 'active' : ''}
          >
            Card View
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'active' : ''}
          >
            List View
          </button>
        </div>
      </div>

      <div className={viewMode === 'card' ? 'product-grid' : 'product-list'}>
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <ProductCard product={product} viewMode={viewMode} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;