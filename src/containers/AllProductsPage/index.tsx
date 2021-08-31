import React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import AllProductsSideBar from '../../components/AllProductsSideBar';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import ShopAction from '../../store/actions/shopAction';
import UserAction from '../../store/actions/userAction';
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
    const { shopProducts, addToCart } = this.props;

    return shopProducts.products.map((product) => {
      return (
        <div key={product.id} className="product-item-container">
          <ProductCard product={product} addToCart={addToCart} />
        </div>
      )
    });
  };

  handlePageChange = (selectedPage: number) => {
    const { userSelectedPage, updateUserShopProductsPage } = this.props;

    if (userSelectedPage !== selectedPage) {
      updateUserShopProductsPage(selectedPage);
    }
  }

  render() {
    const {
      productFilters, userFilters, updateUserFilters, shopProducts, userSelectedPage
    } = this.props;

    return (
      <div className="all-products-page-container">
        <AllProductsSideBar
          productFilters={productFilters}
          userFilters={userFilters}
          onUpdateUserFilters={updateUserFilters} />
        <div className="all-products-container">
          <div className="all-products">
            {this.renderAllProducts()}
          </div>
          <Pagination
            onChange={this.handlePageChange}
            numberOfPages={shopProducts.totalPages}
            overrideSelectedPage={userSelectedPage} />
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
  const { filters, shopProductsPage } = state.user;

  return {
    shopProducts,
    productFilters,
    userFilters: filters,
    userSelectedPage: shopProductsPage,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<AllProductsDispatchToProps, AllProductsOwnProps> = (dispatch) => {
  const { fetchShopProducts, fetchShopProductsAndFilters } = new ShopAction();
  const { updateUserFilters, updateUserShopProductsPage, addToCart } = new UserAction();

  return {
    fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
    fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
    updateUserFilters: (filters) => dispatch(updateUserFilters(filters)),
    updateUserShopProductsPage: (shopProductsPage) => dispatch(updateUserShopProductsPage(shopProductsPage)),
    addToCart: (productPurchase) => dispatch(addToCart(productPurchase)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);