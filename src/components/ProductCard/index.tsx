import React from 'react';
import { ProductPurchase } from '../../store/reducers/userReducer';
import { getProductVariantDetails } from '../../utils/productUtils';
import ProductCardModal from '../ProductCardModal';
import { ProductCardProps, ProductCardState } from './interface';
import './style.css';

class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
  constructor(props: ProductCardProps) {
    super(props);

    this.state = {
      showDetails: false,
    }
  }

  onClickProductCard = () => {
    this.setState({
      showDetails: true,
    })
  }

  onClickOutsideModalBody = () => {
    this.setState({
      showDetails: false,
    })
  }

  handleAddToCart = (product: ProductPurchase) => {
    this.props.addToCart(product);
    this.setState({
      showDetails: false,
    })
  };

  render() {
    const { product } = this.props;
    const { showDetails } = this.state;
    const { initialVariant, variants, variantsOptionsAvailable } = getProductVariantDetails(product);

    return initialVariant ? (
      <div onClick={this.onClickProductCard} className="product-card-container">
        <div
          className="product-image"
          style={{ backgroundImage: `url(${initialVariant.image})` }} />
        <div className="product-details">
          <p>{initialVariant.title}</p>
        </div>
        <ProductCardModal
          show={showDetails}
          initialVariant={initialVariant}
          variants={variants}
          onClickOutsideModalBody={this.onClickOutsideModalBody}
          variantsOptionsAvailable={variantsOptionsAvailable}
          addToCart={this.handleAddToCart} />
      </div>
    ) : null;
  }
}

export default ProductCard;