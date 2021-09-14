/* eslint-disable import/first */
require.extensions['.css'] = () => undefined;
import express from 'express';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React, { Provider } from 'react-redux';
import { Redirect, Route, StaticRouter, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import serialize from 'serialize-javascript';
import ShopAPI, { GetProductsOptions } from '../src/api/shopAPI';
import HandleAllErrors from '../src/components/HandleAllErrors';
import HeaderNavigation from '../src/components/HeaderNavigation';
import { ROUTE } from '../src/constants/route';
import AllProductsPage from '../src/containers/AllProductsPage';
import CheckoutPage from '../src/containers/CheckoutPage';
import ErrorPage from '../src/containers/ErrorPage';
import HomePage from '../src/containers/HomePage';
import ThemeContextProvider from '../src/context/ThemeContext';
import { Product, ProductFilters, shopInitialState, ShopProducts } from '../src/store/reducers/shopReducer';
import { userInitialState } from '../src/store/reducers/userReducer';
import { rootReducer, StoreStateType } from '../src/store/rootReducer';

const app = express();

app.use('/public', express.static('build'));

const htmlFilePath = path.join(__dirname, '../build/index.html');
const htmlContent = fs.readFileSync(htmlFilePath, { encoding: 'utf-8' });

global.document = new JSDOM(htmlContent).window.document;

app.get('*', async (req, res) => {
  let bestSellerProducts: Product[] = [];
  let shopProducts: ShopProducts = {
    ...shopInitialState.shopProducts,
  };
  let productFilters: ProductFilters = {
    ...shopInitialState.productFilters,
  };
  const shopAPI = new ShopAPI();

  try {
    switch (req.url) {
      case ROUTE.HOME:
        const response = await shopAPI.getProducts({ category: ['Best Seller'] });
        const { products } = response.data as ShopProducts;
        bestSellerProducts = products;
        break;
      case ROUTE.ALL_PRODUCTS:
        const options: GetProductsOptions = {
          page: userInitialState.shopProductsPage,
          size: userInitialState.shopProductsSize,
        };
        
        const productsResponse = await shopAPI.getProducts(options);
        const productFiltersResponse = await shopAPI.getProductFilters();
        shopProducts = productsResponse.data as ShopProducts;
        productFilters = productFiltersResponse.data.productFilters as ProductFilters;
        break;
    }
  } catch (e) {
    console.error('Failed to fetch data for store:', e);
  }

  const initialStoreState: StoreStateType = {
    user: userInitialState,
    shop: {
      ...shopInitialState,
      bestSellerProducts,
      shopProducts,
      productFilters,
    },
  };

  const store = createStore(rootReducer, initialStoreState);

  const renderComponent = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <ThemeContextProvider>
          <HeaderNavigation />
          <HandleAllErrors>
          <Switch>
            <Route exact component={AllProductsPage} path={ROUTE.ALL_PRODUCTS} />
            <Route exact component={CheckoutPage} path={ROUTE.CHECKOUT} />
            <Route exact component={ErrorPage} path={ROUTE.ERROR} />
            <Route exact component={HomePage} path={ROUTE.HOME} />
            <Redirect to={ROUTE.HOME} />
          </Switch>
          </HandleAllErrors>
        </ThemeContextProvider>
      </StaticRouter>
    </Provider>
  );

  res.send(
    htmlContent
      .replace('<div id="root"></div>', `<div id="root">${renderComponent}</div>`)
      .replace('window.initialState=null', `window.initialState=${serialize(initialStoreState)}`),
  );
});

app.listen(5000);