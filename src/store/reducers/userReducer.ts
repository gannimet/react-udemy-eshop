import update from 'immutability-helper';
import { Reducer } from 'redux';
import UserAction, { UserReducerAction } from '../actions/userAction';
import { ProductFilters, ProductVariantCompleteDetails } from './shopReducer';

export interface ProductPurchase extends ProductVariantCompleteDetails {
  quantity: number;
}

export interface User {
  filters: ProductFilters;
  shopProductsPage: number;
  shopProductsSize: number;
  cart: ProductPurchase[];
}

const userInitialState: User = {
  filters: {
    gender: [],
    category: [],
    trends: [],
  },
  shopProductsPage: 1,
  shopProductsSize: 2,
  cart: [],
}

export const userReducer: Reducer<User, UserReducerAction> = (state = userInitialState, action) => {
  switch (action.type) {
    case UserAction.UPDATE_USER_FILTERS:
      return update(state, { filters: { $set: action.filters } });
    case UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE:
      return update(state, { shopProductsPage: { $set: action.shopProductsPage } });
    case UserAction.ADD_TO_CART:
      return update(state, { cart: { $push: [action.productPurchase] } });
    case UserAction.REMOVE_FROM_CART:
      const { productId, variantId } = action.productPurchase;
      const newCart = state.cart.filter((product) => {
        return product.productId !== productId && product.variantId !== variantId;
      });

      return update(state, { cart: { $set: newCart } });
    default:
      return state;
  }
};