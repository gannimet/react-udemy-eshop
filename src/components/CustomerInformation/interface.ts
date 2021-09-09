import { History } from 'history';
import { CustomerInformationField, CustomerInformationFieldsList } from '../../constants/user';
import { ProductPurchase } from '../../store/reducers/userReducer';

export interface CustomerInformationProps {
  cart: ProductPurchase[];
  history: History;
  clearCart(): any;
}

export interface CustomerInformationState extends CustomerInformationFieldsList {
  error: CustomerInformationFieldsList;
  hasCompletePurchaseClick: boolean;
  showThankYouModal: boolean;
}

export type CustomerInformationFieldRefs = {
  [field in CustomerInformationField]: React.RefObject<HTMLInputElement>;
};