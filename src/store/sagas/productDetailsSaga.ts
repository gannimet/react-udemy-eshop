import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import ProductDetailsAPI from '../../api/productDetailsAPI';
import ProductDetailsAction from '../actions/productDetailsAction';
import { ProductDetails } from '../reducers/productDetailsReducer';

function* workerFetchProductDetailSaga() {
  const productDetailsAPI = new ProductDetailsAPI();
  const productDetailsAction = new ProductDetailsAction();

  try {
    const response: AxiosResponse = yield call(productDetailsAPI.getProducts);
    const productDetails = response.data as ProductDetails;
  
    yield put(productDetailsAction.set(productDetails));
  } catch (err) {
    console.log('Error fetching product details:', err);
  }
}

export function* watchProductDetailsSaga() {
  yield takeLatest(ProductDetailsAction.FETCH_PRODUCT_DETAILS, workerFetchProductDetailSaga);
}