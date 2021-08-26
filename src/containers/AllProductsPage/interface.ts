import { RouteComponentProps } from 'react-router-dom';
import { GetProductsOptions } from '../../api/shopAPI';
import { FetchShopProductsAction, FetchShopProductsAndFiltersAction } from '../../store/actions/shopAction';
import { UpdateUserFiltersAction } from '../../store/actions/userAction';
import { ProductFilters, ShopProducts } from '../../store/reducers/shopReducer';

export interface AllProductsStateProps {
  shopProducts: ShopProducts;
  productFilters: ProductFilters,
  userFilters: ProductFilters,
}

export interface AllProductsOwnProps extends RouteComponentProps {}

export interface AllProductsDispatchToProps {
  fetchShopProducts(options: GetProductsOptions): FetchShopProductsAction;
  fetchShopProductsAndFilters(): FetchShopProductsAndFiltersAction;
  updateUserFilters(filters: ProductFilters): UpdateUserFiltersAction;
}

export type AllProductsPageProps = AllProductsStateProps & AllProductsOwnProps & AllProductsDispatchToProps;