import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ShopAPI, { GetProductsOptions } from '../../api/shopAPI';
import { convertFiltersToCategories } from '../../utils/helper';
import ShopAction from '../actions/shopAction';
import UserAction, { UpdateUserFiltersAction, UpdateUserShopProductsAction } from '../actions/userAction';
import { ShopProducts } from '../reducers/shopReducer';
import { User } from '../reducers/userReducer';
import { StoreStateType } from '../rootReducer';

function* workerUpdateUserFiltersSaga(action: UpdateUserFiltersAction) {
  const shopAPI = new ShopAPI();
  const shopAction = new ShopAction();

  try {
    const response: AxiosResponse = yield call(shopAPI.getProducts, {
      category: convertFiltersToCategories(action.filters)
    });
    const shopProducts = response.data as ShopProducts;

    yield put(shopAction.setShopProducts(shopProducts));
  } catch (err) {
    console.log(err);
  }
}

function* workerUpdateUserShopProductsPageSaga(action: UpdateUserShopProductsAction) {
  const shopAPI = new ShopAPI();
  const shopAction = new ShopAction();

  try {
    const user: User = yield select((state: StoreStateType) => state.user);
  
    const options: GetProductsOptions = {
      page: action.shopProductsPage,
      size: user.shopProductsSize,
      category: convertFiltersToCategories(user.filters),
    };
  
    const response: AxiosResponse = yield call(shopAPI.getProducts, options);
    const shopProducts = response.data as ShopProducts;
  
    yield put(shopAction.setShopProducts(shopProducts));
  } catch (err) {
    console.log(err);
  }
}

export function* watchUserSaga() {
  yield takeLatest(UserAction.UPDATE_USER_FILTERS, workerUpdateUserFiltersSaga);
  yield takeLatest(UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE, workerUpdateUserShopProductsPageSaga);
}