import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import './App.css';
import HeaderNavigation from './components/HeaderNavigation';
import { ROUTE } from './constants/route';
import AllProductsPage from './containers/AllProductsPage';
import CheckoutPage from './containers/CheckoutPage';
import HomePage from './containers/HomePage';
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
        <div className="app-container">
          <HeaderNavigation />
          <Switch>
            <Route exact component={AllProductsPage} path={ROUTE.ALL_PRODUCTS} />
            <Route exact component={CheckoutPage} path={ROUTE.CHECKOUT} />
            <Route exact component={HomePage} path={ROUTE.HOME} />
            <Redirect to={ROUTE.HOME} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
