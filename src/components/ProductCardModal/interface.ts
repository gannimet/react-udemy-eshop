import { ProductVariantCompleteDetails } from '../../store/reducers/shopReducer';
import { VariantsOptionsAvailable } from '../../utils/productUtils';

export interface ProductCardModalProps {
  show: boolean;
  initialVariant: ProductVariantCompleteDetails;
  variants: ProductVariantCompleteDetails[];
  onClickOutsideModalBody?(): void;
  variantsOptionsAvailable: VariantsOptionsAvailable;
}

export interface ProductCardModalState {
  selectedVariant: ProductVariantCompleteDetails;
  quantity: number;
}