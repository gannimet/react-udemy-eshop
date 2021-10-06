import { StoreStateType } from '../../store/rootReducer';

export const allProductsStoreEqualityFn = (
  prevState: StoreStateType,
  nextState: StoreStateType
): boolean => {
  const { shop: prevShop, user: prevUser } = prevState;
  const { shop: nextShop, user: nextUser } = nextState;

  return nextShop.shopProducts === prevShop.shopProducts &&
    nextShop.productFilters === prevShop.productFilters &&
    nextUser.filters === prevUser.filters &&
    nextUser.shopProductsPage === prevUser.shopProductsPage;
};