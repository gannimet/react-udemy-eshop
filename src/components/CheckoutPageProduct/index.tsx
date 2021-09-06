import React from 'react';
import { SIZE } from '../../constants/product';
import { upperCaseFirstLetter } from '../../utils/helper';
import { getBackgroundColorStyleForButton, getSubTotalPrice } from '../../utils/productUtils';
import { CheckoutPageProductProps } from './interface';
import './style.css';

const CheckoutPageProduct: React.FC<CheckoutPageProductProps> = ({ product }) => {
  const { title, image, size, color, quantity } = product;
  const subTotalPrice = getSubTotalPrice(product);
  const styleColor = getBackgroundColorStyleForButton(color);

  return (
    <div className="checkout-page-product-container">
      <div className="image-container">
        <div style={{ backgroundImage: `url(${image})` }} className="product-image" />
      </div>

      <div className="product-details">
        <p className="product-name">{title}</p>
        <p>{SIZE[size]}</p>
        <div
          title={upperCaseFirstLetter(color)}
          style={styleColor}
          className="color" />
      </div>
      
      <div className="quantity">
        <p>QTY: {quantity}</p>
      </div>
      <div className="subtotal-price">
        <p>Subtotal: ${subTotalPrice}</p>
      </div>
    </div>
  )
};

export default CheckoutPageProduct;