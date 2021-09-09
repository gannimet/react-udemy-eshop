import { ProductFilters } from '../reducers/shopReducer';
import { ProductPurchase } from '../reducers/userReducer';

export type UserReducerAction =
  | UpdateUserFiltersAction
  | UpdateUserShopProductsPageAction
  | AddToCartAction
  | RemoveFromCartAction
  | ClearCartAction;

export interface UpdateUserFiltersAction {
  type: typeof UserAction.UPDATE_USER_FILTERS;
  filters: ProductFilters;
}

export interface UpdateUserShopProductsPageAction {
  type: typeof UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE;
  shopProductsPage: number,
}

export interface AddToCartAction {
  type: typeof UserAction.ADD_TO_CART;
  productPurchase: ProductPurchase;
}

export interface RemoveFromCartAction {
  type: typeof UserAction.REMOVE_FROM_CART;
  productPurchase: ProductPurchase;
}

export interface ClearCartAction {
  type: typeof UserAction.CLEAR_CART;
}

class UserAction {
  static readonly UPDATE_USER_FILTERS = 'UPDATE_USER_FILTERS';
  static readonly UPDATE_USER_SHOP_PRODUCTS_PAGE = 'UPDATE_USER_SHOP_PRODUCTS_PAGE';
  static readonly ADD_TO_CART = 'ADD_TO_CART';
  static readonly REMOVE_FROM_CART = 'REMOVE_FROM_CART';
  static readonly CLEAR_CART = 'CLEAR_CART';

  updateUserFilters = (filters: ProductFilters): UpdateUserFiltersAction => {
    return {
      type: UserAction.UPDATE_USER_FILTERS,
      filters,
    }
  };

  updateUserShopProductsPage = (shopProductsPage: number): UpdateUserShopProductsPageAction => {
    return {
      type: UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE,
      shopProductsPage,
    }
  };

  addToCart = (productPurchase: ProductPurchase): AddToCartAction => {
    return {
      type: UserAction.ADD_TO_CART,
      productPurchase,
    };
  };

  removeFromCart = (productPurchase: ProductPurchase): RemoveFromCartAction => {
    return {
      type: UserAction.REMOVE_FROM_CART,
      productPurchase,
    };
  };

  clearCart = (): ClearCartAction => {
    return {
      type: UserAction.CLEAR_CART,
    };
  };
}

export default UserAction;