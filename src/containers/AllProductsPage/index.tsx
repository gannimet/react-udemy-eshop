import React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import AllProductsSideBar from '../../components/AllProductsSideBar';
import ProductCard from '../../components/ProductCard';
import ShopAction from '../../store/actions/shopAction';
import UserAction from '../../store/actions/userAction';
import { StoreStateType } from '../../store/rootReducer';
import Button from '../../ui-components/Button';
import { AllProductsDispatchToProps, AllProductsOwnProps, AllProductsPageProps, AllProductsStateProps } from './interface';
import './style.css';

class AllProductsPage extends React.Component<AllProductsPageProps> {
  componentDidMount() {
    const { shopProducts } = this.props;

    if (!shopProducts.products.length) {
      this.props.fetchShopProductsAndFilters();
    }
  }

  renderAllProducts = () => {
    const { shopProducts } = this.props;

    return shopProducts.products.map(({ title, variants, id }) => {
      return (
        <div key={id} className="product-item-container">
          <ProductCard
            name={title}
            url={variants[0].image} />
        </div>
      )
    });
  };

  render() {
    const { productFilters, userFilters, updateUserFilters } = this.props;

    return (
      <div className="all-products-page-container">
        <Button type="primary" onClick={() => {}}>Test</Button>
        <AllProductsSideBar
          productFilters={productFilters}
          userFilters={userFilters}
          onUpdateUserFilters={updateUserFilters} />
        <div className="all-products-container">
          {this.renderAllProducts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<
  AllProductsStateProps,
  AllProductsOwnProps,
  StoreStateType
> = (state) => {
  const { shopProducts, productFilters } = state.shop;
  const { filters } = state.user;

  return {
    shopProducts,
    productFilters,
    userFilters: filters,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<AllProductsDispatchToProps, AllProductsOwnProps> = (dispatch) => {
  const { fetchShopProducts, fetchShopProductsAndFilters } = new ShopAction();
  const { updateUserFilters } = new UserAction();

  return {
    fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
    fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
    updateUserFilters: (filters) => dispatch(updateUserFilters(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);