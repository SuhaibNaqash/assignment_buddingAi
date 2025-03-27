import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/ProductDetails.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <Link to="/" className="back-link">← Back to Products</Link>
      
      <div className="product-details">
        <div className="product-details-image">
          <img 
            src={product.image} 
            alt={product.title} 
          />
        </div>
        
        <div className="product-details-info">
          <h1>{product.title}</h1>
          <p className="product-details-description">{product.description}</p>
          
          <div className="product-details-meta">
            <div>
              <strong>Category:</strong> {product.category}
            </div>
            
            <div className="product-details-price">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          {product.rating && (
            <div className="product-details-rating">
              ★ {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
            </div>
          )}
          
          <button className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;