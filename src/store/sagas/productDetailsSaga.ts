import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import ProductDetailsAPI from '../../api/productDetailsAPI';
import ProductDetailsAction, { FetchShopProductsAction } from '../actions/productDetailsAction';
import { ShopProducts } from '../reducers/productDetailsReducer';

function* workerFetchShopProductsSaga(action: FetchShopProductsAction) {
  const productDetailsAPI = new ProductDetailsAPI();
  const productDetailsAction = new ProductDetailsAction();

  try {
    const response: AxiosResponse = yield call(productDetailsAPI.getProducts, action.options);
    const shopProducts = response.data as ShopProducts;
  
    yield put(productDetailsAction.setShopProducts(shopProducts));
  } catch (err) {
    console.log('Error fetching product details:', err);
  }
}

function* workerFetchBestSellerProductsSaga() {
  const productDetailsAPI = new ProductDetailsAPI();
  const productDetailsAction = new ProductDetailsAction();

  try {
    const response: AxiosResponse = yield call(productDetailsAPI.getProducts, { category: ['Best Seller'] });
    const { products } = response.data as ShopProducts;
  
    yield put(productDetailsAction.setBestSellerProducts(products));
  } catch (err) {
    console.log('Error fetching product details:', err);
  }
}

export function* watchProductDetailsSaga() {
  yield takeLatest(ProductDetailsAction.FETCH_SHOP_PRODUCTS, workerFetchShopProductsSaga);
  yield takeLatest(ProductDetailsAction.FETCH_ALL_BEST_SELLER_PRODUCTS, workerFetchBestSellerProductsSaga);
}