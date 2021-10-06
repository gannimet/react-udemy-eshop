import { RouteComponentProps } from 'react-router-dom';
import { GetProductsOptions } from '../../api/shopAPI';
import { FetchShopProductsAction, FetchShopProductsAndFiltersAction } from '../../store/actions/shopAction';
import { AddToCartAction, UpdateUserFiltersAction, UpdateUserShopProductsPageAction } from '../../store/actions/userAction';
import { ProductFilters, ShopProducts } from '../../store/reducers/shopReducer';
import { ProductPurchase } from '../../store/reducers/userReducer';

export interface AllProductsStateProps {
  shopProducts: ShopProducts;
  productFilters: ProductFilters,
  userFilters: ProductFilters,
  userSelectedPage: number;
}

export interface AllProductsPageProps extends RouteComponentProps {}

export interface AllProductsDispatchToProps {
  fetchShopProducts(options: GetProductsOptions): FetchShopProductsAction;
  fetchShopProductsAndFilters(): FetchShopProductsAndFiltersAction;
  updateUserFilters(filters: ProductFilters): UpdateUserFiltersAction;
  updateUserShopProductsPage(shopProductsPage: number): UpdateUserShopProductsPageAction;
  addToCart(productPurchase: ProductPurchase): AddToCartAction;
}