import React from 'react';
import { getDiscountedPrice } from '../../utils/productUtils';
import { ProductCardModalPriceUIProps } from './interface';

const ProductCardModalPriceUI: React.FC<ProductCardModalPriceUIProps> = ({ selectedVariant }) => {
  const { price, discount } = selectedVariant;

  return (
    <p className="price-ui">
      {discount ? (
        <React.Fragment>
          <del className="old-price">{price}</del>
          <ins>${getDiscountedPrice(price, discount)}</ins>
        </React.Fragment>
      ) : <ins>{price}</ins>}
    </p>
  );
};

export default ProductCardModalPriceUI;