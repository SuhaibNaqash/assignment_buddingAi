import React from 'react';
import './styles/ProductCard.css';

const ProductCard = ({ product, viewMode }) => {
  if (viewMode === 'card') {
    return (
      <div className="product-card">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-card-image"
        />
        <div className="product-card-title">{product.title}</div>
        <div className="product-card-details">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          {product.rating && (
            <span className="product-card-rating">
              ★ {product.rating.rate.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="product-card product-list-view">
      <img 
        src={product.image} 
        alt={product.title} 
      />
      <div className="product-card-details">
        <div className="product-card-title">{product.title}</div>
        <div>
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          {product.rating && (
            <span className="product-card-rating">
              ★ {product.rating.rate.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;