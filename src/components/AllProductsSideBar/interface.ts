import { ProductFilters } from '../../store/reducers/shopReducer';

export interface ProductFiltersPropsProps {
  productFilters: ProductFilters;
  userFilters: ProductFilters;
  onUpdateUserFilters(filters: ProductFilters): void;
}