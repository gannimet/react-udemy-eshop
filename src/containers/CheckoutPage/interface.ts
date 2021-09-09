import { RouteComponentProps } from 'react-router-dom';
import { ClearCartAction } from '../../store/actions/userAction';
import { ProductPurchase } from '../../store/reducers/userReducer';

export interface CheckoutPageStateProps {
  cart: ProductPurchase[];
}

export interface CheckoutPageOwnProps extends RouteComponentProps {}

export interface CheckoutPageDispatchProps {
  clearCart(): ClearCartAction;
}

export type CheckoutPageProps =
  & CheckoutPageOwnProps
  & CheckoutPageStateProps
  & CheckoutPageDispatchProps;

export interface CheckoutPageState {}