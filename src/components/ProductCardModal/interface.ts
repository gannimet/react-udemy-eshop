import { ProductVariantCompleteDetails } from '../../store/reducers/shopReducer';

export interface ProductCardModalProps {
  show: boolean;
  initialVariant: ProductVariantCompleteDetails;
  variants: ProductVariantCompleteDetails[];
  onClickOutsideModalBody?(): void;
}

export interface ProductCardModalState {
  selectedVariant: ProductVariantCompleteDetails;
}