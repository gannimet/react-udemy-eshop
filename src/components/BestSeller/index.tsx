import React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import ShopAction from '../../store/actions/shopAction';
import { StoreStateType } from '../../store/rootReducer';
import ProductCard from '../ProductCard';
import { BestSellerDispatchProps, BestSellerProps, BestSellerStateProps } from './interface';
import './style.css';

class BestSeller extends React.Component<BestSellerProps> {
  componentDidMount() {
    const { bestSellerProducts } = this.props;

    if (!bestSellerProducts.length) {
      this.props.fetchAllBestSellerProducts();
    }
  }

  renderBestSellerProducts() {
    const { bestSellerProducts } = this.props;

    return bestSellerProducts.map((product) => {
      return (
        <ProductCard product={product} key={product.id} />
      );
    });
  }

  render() {
    return (
      <div className="best-seller-container">
        <h2>Best Seller</h2>
        <div className="best-seller-products">
          {this.renderBestSellerProducts()}
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<BestSellerStateProps, {}, StoreStateType> = (state) => {
  return {
    bestSellerProducts: state.shop.bestSellerProducts,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<BestSellerDispatchProps, {}> = (dispatch) => {
  const { fetchAllBestSellerProducts } = new ShopAction();

  return {
    fetchAllBestSellerProducts: () => dispatch(fetchAllBestSellerProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);