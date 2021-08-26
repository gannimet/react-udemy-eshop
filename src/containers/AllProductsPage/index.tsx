import React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import AllProductsSideBar from '../../components/AllProductsSideBar';
import ProductCard from '../../components/ProductCard';
import ShopAction from '../../store/actions/shopAction';
import { StoreStateType } from '../../store/rootReducer';
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
    const { productFilters } = this.props;

    return (
      <div className="all-products-page-container">
        <AllProductsSideBar productFilters={productFilters} />
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

  return {
    shopProducts,
    productFilters,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<AllProductsDispatchToProps, AllProductsOwnProps> = (dispatch) => {
  const { fetchShopProducts, fetchShopProductsAndFilters } = new ShopAction();

  return {
    fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
    fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);