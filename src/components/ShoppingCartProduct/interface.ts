import { ProductPurchase } from '../../store/reducers/userReducer';

export interface ShoppingCartProductProps {
  product: ProductPurchase;
  removeFromCart(productPurchase: ProductPurchase): any;
}