import { Product } from '../../store/reducers/shopReducer';
import { ProductPurchase } from '../../store/reducers/userReducer';

export interface ProductCardProps {
  product: Product;
  addToCart(productPurchase: ProductPurchase): any;
}

export interface ProductCardState {
  showDetails: boolean;
}