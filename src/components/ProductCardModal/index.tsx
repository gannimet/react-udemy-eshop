import React from 'react';
import Modal from '../../ui-components/Modal';
import { ProductCardModalProps, ProductCardModalState } from './interface';
import './style.css';

class ProductCardModal extends React.Component<ProductCardModalProps, ProductCardModalState> {
  constructor(props: ProductCardModalProps) {
    super(props);

    this.state = {
      selectedVariant: props.initialVariant,
    };
  }

  render() {
    const { show, onClickOutsideModalBody } = this.props;
    const { selectedVariant } = this.state;
    const { title, image } = selectedVariant;

    return (
      <Modal
        onClickOutsideModalBody={onClickOutsideModalBody}
        modalBodyClassName="product-card-modal-body"
        show={show}>
        <div className="modal-product-details-container">
          <div className="modal-product-image">
            <img src={image} alt="Product preview" />
          </div>

          <div className="modal-product-details">
            <p className="modal-product-name">{title}</p>
          </div>
        </div>
      </Modal>
    )
  }
}

export default ProductCardModal;