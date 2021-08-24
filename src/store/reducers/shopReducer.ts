import update from 'immutability-helper';
import { Reducer } from 'redux';
import ShopAction, { ShopReducerAction } from '../actions/shopAction';

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: string;
  stock: number;
  discount?: string;
  image: string;
}

export interface Product {
  id: string;
  category: string[];
  title: string;
  variants: ProductVariant[];
}

export interface ShopProducts {
  page?: number;
  nextPage?: boolean;
  productsCount: number;
  products: Product[];
  totalPages?: number;
}

export interface ProductFilters {
  gender: string[];
  category: string[];
  trends: string[];
}

export interface Shop {
  shopProducts: ShopProducts;
  bestSellerProducts: Product[];
  productFilters: ProductFilters;
}

const shopInitialState: Shop = {
  shopProducts: {
    products: [],
    productsCount: 0,
  },
  bestSellerProducts: [],
  productFilters: {
    gender: [],
    category: [],
    trends: [],
  }
}

export const shopReducer: Reducer<Shop, ShopReducerAction> =
  (state = shopInitialState, action) => {
    switch (action.type) {
      case ShopAction.SET_SHOP_PRODUCTS:
        return update(state, { shopProducts: { $set: action.shopProducts } });
      case ShopAction.SET_BEST_SELLER_PRODUCTS:
        return update(state, { bestSellerProducts: { $set: action.bestSellerProducts } });
      case ShopAction.SET_SHOP_PRODUCTS_AND_FILTERS:
        return update(state, {
          shopProducts: { $set: action.shopProducts },
          productFilters: { $set: action.productFilters },
        });
      default:
        return state;
    }
  };