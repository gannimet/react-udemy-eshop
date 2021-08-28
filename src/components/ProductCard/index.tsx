import React from 'react';
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

  render() {
    const { product } = this.props;
    const { showDetails } = this.state;
    const { title, variants } = product;
    const imageURL = variants[0].image;

    return (
      <div onClick={this.onClickProductCard} className="product-card-container">
        <div
          className="product-image"
          style={{ backgroundImage: `url(${imageURL})` }} />
        <div className="product-details">
          <p>{title}</p>
        </div>
        <ProductCardModal
          show={showDetails}
          product={product}
          onClickOutsideModalBody={this.onClickOutsideModalBody} />
      </div>
    )
  }
}

export default ProductCard;