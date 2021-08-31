import React from 'react';
import Button from '../../ui-components/Button';
import Modal from '../../ui-components/Modal';
import ProductCardModalPriceUI from '../ProductCardModalPriceUI';
import ProductCardModalQuantityUI from '../ProductCardModalQuantityUI/index';
import ProductCardModalVariantOptions from '../ProductCardModalVariantOptions';
import { ProductCardModalProps, ProductCardModalState } from './interface';
import './style.css';

class ProductCardModal extends React.Component<ProductCardModalProps, ProductCardModalState> {
  constructor(props: ProductCardModalProps) {
    super(props);

    this.state = {
      selectedVariant: props.initialVariant,
      quantity: 1,
    };
  }

  handleClickQuantityAddButton = () => {
    const { quantity, selectedVariant } = this.state;

    selectedVariant.stock > quantity && this.setState({
      quantity: quantity + 1,
    })
  }

  handleClickQuantityMinusButton = () => {
    const { quantity } = this.state;

    quantity > 1 && this.setState({
      quantity: quantity - 1,
    })
  }

  handleSizeChange = (size: string) => {
    const { selectedVariant } = this.state;
    const { variants } = this.props;

    if (selectedVariant.size !== size) {
      this.setState({
        selectedVariant: variants.find((variant) => {
          return variant.size === size && variant.stock;
        })!,
      })
    }
  };

  handleColorChange = (color: string) => {
    const { selectedVariant } = this.state;
    const { variants } = this.props;

    if (selectedVariant.color !== color) {
      this.setState({
        selectedVariant: variants.find((variant) => {
          return variant.size === selectedVariant.size
            && variant.color === color
            && variant.stock > 0;
        })!,
      })
    }
  };

  render() {
    const { show, onClickOutsideModalBody, variants, variantsOptionsAvailable } = this.props;
    const { selectedVariant, quantity } = this.state;
    const { title, image } = selectedVariant;

    return (
      <Modal
        onClickOutsideModalBody={onClickOutsideModalBody}
        modalBodyClassName="product-card-modal-body"
        show={show}>
        <div className="modal-product-details-container">
          <div className="modal-product-image-container">
            <div
              className="modal-product-image"
              style={{ backgroundImage: `url(${image})` }} />
          </div>

          <div className="modal-product-details">
            <p className="modal-product-name">{title}</p>
            <ProductCardModalPriceUI
              selectedVariant={selectedVariant} />
            <ProductCardModalQuantityUI
              quantity={quantity}
              onClickAdd={this.handleClickQuantityAddButton}
              onClickMinus={this.handleClickQuantityMinusButton} />
            <ProductCardModalVariantOptions
              selectedVariant={selectedVariant}
              variants={variants}
              variantsOptionsAvailable={variantsOptionsAvailable}
              onSizeChange={this.handleSizeChange}
              onColorChange={this.handleColorChange} />

            <Button 
              type="primary"
              className="add-to-cart-button"
              onClick={() => {}}>Add To Cart</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ProductCardModal;