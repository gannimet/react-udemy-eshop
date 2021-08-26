import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import ShopAPI from '../../api/shopAPI';
import { convertFiltersToCategories } from '../../utils/helper';
import ShopAction from '../actions/shopAction';
import UserAction, { UpdateUserFiltersAction } from '../actions/userAction';
import { ShopProducts } from '../reducers/shopReducer';

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

export function* watchUserSaga() {
  yield takeLatest(UserAction.UPDATE_USER_FILTERS, workerUpdateUserFiltersSaga)
}