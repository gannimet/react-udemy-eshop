import { RemoveFromCartAction } from '../../store/actions/userAction';
import { ProductPurchase } from '../../store/reducers/userReducer';

export interface ShoppingCartStateProps {
  cart: ProductPurchase[];
}

export interface ShoppingCartOwnProps {}

export interface ShoppingCartDispatchProps {
  removeFromCart(productPurchase: ProductPurchase): RemoveFromCartAction;
}

export type ShoppingCartProps =
  & ShoppingCartStateProps
  & ShoppingCartOwnProps
  & ShoppingCartDispatchProps;

export interface ShoppingCartState {
  showPopover: boolean;
}