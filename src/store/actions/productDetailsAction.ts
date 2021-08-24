import { GetProductsOptions } from '../../api/productDetailsAPI';
import { Product, ShopProducts } from '../reducers/productDetailsReducer';

export type ProductDetailsReducerAction =
  | SetShopProductsAction
  | FetchShopProductsAction
  | FetchBestSellerProductsAction
  | SetBestSellerProductsAction;

export interface SetShopProductsAction {
  type: typeof ProductDetailsAction.SET_SHOP_PRODUCTS;
  shopProducts: ShopProducts,
}

export interface FetchShopProductsAction {
  type: typeof ProductDetailsAction.FETCH_SHOP_PRODUCTS,
  options: GetProductsOptions,
}

export interface SetBestSellerProductsAction {
  type: typeof ProductDetailsAction.SET_BEST_SELLER_PRODUCTS;
  bestSellerProducts: Product[];
}

export interface FetchBestSellerProductsAction {
  type: typeof ProductDetailsAction.FETCH_ALL_BEST_SELLER_PRODUCTS,
}

class ProductDetailsAction {
  static readonly FETCH_SHOP_PRODUCTS = 'FETCH_SHOP_PRODUCTS';
  static readonly SET_SHOP_PRODUCTS = 'SET_SHOP_PRODUCTS';
  static readonly FETCH_ALL_BEST_SELLER_PRODUCTS = 'FETCH_ALL_BEST_SELLER_PRODUCTS';
  static readonly SET_BEST_SELLER_PRODUCTS = 'SET_BEST_SELLER_PRODUCTS';

  fetchShopProducts = (options: GetProductsOptions): FetchShopProductsAction => {
    return {
      type: ProductDetailsAction.FETCH_SHOP_PRODUCTS,
      options,
    };
  };

  setShopProducts = (shopProducts: ShopProducts): SetShopProductsAction => {
    return {
      type: ProductDetailsAction.SET_SHOP_PRODUCTS,
      shopProducts,
    };
  };

  fetchAllBestSellerProducts = (): FetchBestSellerProductsAction => {
    return {
      type: ProductDetailsAction.FETCH_ALL_BEST_SELLER_PRODUCTS,
    };
  };

  setBestSellerProducts = (bestSellerProducts: Product[]): SetBestSellerProductsAction => {
    return {
      type: ProductDetailsAction.SET_BEST_SELLER_PRODUCTS,
      bestSellerProducts,
    };
  };
}


export default ProductDetailsAction;