import React from 'react';
import { ProductCardModalQuantityUIProps } from './interface';

const ProductCardModalQuantityUI: React.FC<ProductCardModalQuantityUIProps> = ({ quantity }) => {
  return (
    <div className="quantity-container">
      <label>
        <i className="fa fa-minus qty-button" />
        <span className="qty-value">QTY {quantity}</span>
        <i className="fa fa-plus qty-button" />
      </label>
    </div>
  );
};

export default ProductCardModalQuantityUI;