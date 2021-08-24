import update from 'immutability-helper';
import { Reducer } from 'redux';
import ProductDetailsAction, { ProductDetailsReducerAction } from '../actions/productDetailsAction';

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

export interface ProductDetails {
  shopProducts: ShopProducts;
  bestSellerProducts: Product[];
}

const productDetailsInitialState: ProductDetails = {
  shopProducts: {
    products: [],
    productsCount: 0,
  },
  bestSellerProducts: [],
}

export const productDetailsReducer: Reducer<ProductDetails, ProductDetailsReducerAction> =
  (state = productDetailsInitialState, action) => {
    switch (action.type) {
      case ProductDetailsAction.SET_SHOP_PRODUCTS:
        return update(state, { shopProducts: { $set: action.shopProducts } });
      case ProductDetailsAction.SET_BEST_SELLER_PRODUCTS:
        return update(state, { bestSellerProducts: { $set: action.bestSellerProducts } });
      default:
        return state;
    }
  };