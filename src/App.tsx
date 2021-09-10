import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import HeaderNavigation from './components/HeaderNavigation';
import { ROUTE } from './constants/route';
import AllProductsPage from './containers/AllProductsPage';
import CheckoutPage from './containers/CheckoutPage';
import HomePage from './containers/HomePage';
import ThemeContextProvider from './context/ThemeContext';
import { rootReducer } from './store/rootReducer';
import startRootSaga from './store/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(startRootSaga);

(window as any).shopspree = store;

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <HeaderNavigation />
          <Switch>
            <Route exact component={AllProductsPage} path={ROUTE.ALL_PRODUCTS} />
            <Route exact component={CheckoutPage} path={ROUTE.CHECKOUT} />
            <Route exact component={HomePage} path={ROUTE.HOME} />
            <Redirect to={ROUTE.HOME} />
          </Switch>
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
