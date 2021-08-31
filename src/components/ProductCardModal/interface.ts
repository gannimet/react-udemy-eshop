import { ProductVariantCompleteDetails } from '../../store/reducers/shopReducer';
import { ProductPurchase } from '../../store/reducers/userReducer';
import { VariantsOptionsAvailable } from '../../utils/productUtils';

export interface ProductCardModalProps {
  show: boolean;
  initialVariant: ProductVariantCompleteDetails;
  variants: ProductVariantCompleteDetails[];
  onClickOutsideModalBody?(): void;
  variantsOptionsAvailable: VariantsOptionsAvailable;
  addToCart(productPurchase: ProductPurchase): any;
}

export interface ProductCardModalState {
  selectedVariant: ProductVariantCompleteDetails;
  quantity: number;
}