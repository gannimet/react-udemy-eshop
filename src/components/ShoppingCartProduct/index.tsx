import React from 'react';
import { upperCaseFirstLetter } from '../../utils/helper';
import { getSubTotalPrice } from '../../utils/productUtils';
import { ShoppingCartProductProps } from './interface';
import './style.css';

const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = ({ product, removeFromCart }) => {
  const { image, title, size, color, quantity } = product;
  const subTotalPrice = getSubTotalPrice(product);

  const handleOnClickCloseButton = () => {
    removeFromCart(product);
  }

  return (
    <div className="shopping-cart-product-container">
      <div className="image-container">
        <div style={{ backgroundImage: `url(${image})` }} className="product-image" />
      </div>

      <div className="product-details">
        <p className="product-name">{title}</p>
        <p>{size}</p>
        <p>{upperCaseFirstLetter(color)}</p>
        <p>QTY: {quantity}</p>
        <p className="sub-total">Subtotal: ${subTotalPrice}</p>
      </div>

      <div
        className="close-button"
        onClick={handleOnClickCloseButton}
      >
        <i className="fa fa-times" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ShoppingCartProduct;