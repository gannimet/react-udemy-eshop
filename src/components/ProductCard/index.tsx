import React from 'react';
import { ProductCardProps } from './interface';
import './style.css';

const ProductCard: React.FC<ProductCardProps> = ({name, url}) => {
  return (
    <div className="product-card-container">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${url})` }} />
      <div className="product-details">
        <p>{name}</p>
      </div>
    </div>
  )
};

export default ProductCard;