import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import HandleAllErrors from './components/HandleAllErrors';
import HeaderNavigation from './components/HeaderNavigation';
import { ROUTE } from './constants/route';
import ErrorPage from './containers/ErrorPage/index';
import ThemeContextProvider from './context/ThemeContext';
import { rootReducer } from './store/rootReducer';
import startRootSaga from './store/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(startRootSaga);

(window as any).shopspree = store;

const HomePage = React.lazy(() => import('./containers/HomePage'));
const AllProductsPage = React.lazy(() => import('./containers/AllProductsPage'));
const CheckoutPage = React.lazy(() => import('./containers/CheckoutPage'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <HeaderNavigation />
          <HandleAllErrors>
            <Suspense fallback={null}>
              <Switch>
                <Route exact component={AllProductsPage} path={ROUTE.ALL_PRODUCTS} />
                <Route exact component={CheckoutPage} path={ROUTE.CHECKOUT} />
                <Route exact component={ErrorPage} path={ROUTE.ERROR} />
                <Route exact component={HomePage} path={ROUTE.HOME} />
                <Redirect to={ROUTE.HOME} />
              </Switch>
            </Suspense>
          </HandleAllErrors>
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
