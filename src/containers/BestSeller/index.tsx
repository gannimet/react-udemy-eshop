import React from 'react';
import ProductCard from '../../components/ProductCard';
import './style.css';

class BestSeller extends React.Component {
  render() {
    return (
      <div className="best-seller-container">
        <h2>Best Seller</h2>
        <div className="best-seller-products">
          <ProductCard
            name="Formal Dress Shirts Casual Long Sleeve Slim Fit"
            url="http://localhost:1234/public/images/Formal%20Dress%20Shirts%20Casual%20Long%20Sleeve%20Slim%20Fit%20-%20Blue.png" />
          <ProductCard
            name="Formal Dress Shirts Casual Short Sleeve Slim Fit"
            url="http://localhost:1234/public/images/Formal%20Dress%20Shirts%20Casual%20Short%20Sleeve%20Slim%20Fit%20-%20Blue.png" />
          <ProductCard
            name="Soft Summer Short Slim Fit"
            url="http://localhost:1234/public/images/Soft%20Summer%20Short%20Slim%20Fit%20-%20Gray.png" />
        </div>
      </div>
    )
  }
}

export default BestSeller;