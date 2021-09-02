import React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartProduct from '../../components/ShoppingCartProduct/index';
import { ROUTE } from '../../constants/route';
import UserAction from '../../store/actions/userAction';
import { ProductPurchase } from '../../store/reducers/userReducer';
import { StoreStateType } from '../../store/rootReducer';
import Button from '../../ui-components/Button';
import Popover from '../../ui-components/Popover';
import { ShoppingCartDispatchProps, ShoppingCartOwnProps, ShoppingCartProps, ShoppingCartState, ShoppingCartStateProps } from './interface';
import './style.css';

class ShoppingCart extends React.Component<ShoppingCartProps, ShoppingCartState> {
  constructor(props: ShoppingCartProps) {
    super(props);

    this.state = {
      showPopover: false,
    };
  }

  handlePopoverClick = () => {
    const { cart } = this.props;

    cart.length && this.setState({
      showPopover: !this.state.showPopover,
    });
  }

  handleRemoveFromCart = (product: ProductPurchase) => {
    const { cart, removeFromCart } = this.props;

    if (cart.length === 1) {
      this.setState({
        showPopover: false,
      });
    }

    removeFromCart(product);
  };

  getAllProducts = () => {
    const { cart } = this.props;

    return cart.map((product) => (
      <ShoppingCartProduct
        key={`${product.productId}-${product.variantId}`}
        product={product}
        removeFromCart={this.handleRemoveFromCart} />
    ));
  }

  render() {
    const { cart } = this.props;
    const { showPopover } = this.state;

    const cartLength = cart.length;
    const notificationUI = cartLength ? (
      <div className="shop-cart-notification">{cartLength}</div>
    ) : null;

    const popoverContent = (
      <div className="shopping-cart-container-popover">
        <div className="shopping-cart-all-products">
          {this.getAllProducts()}
        </div>
        <Link
          to={ROUTE.CHECKOUT}
          component={({ navigate }) => {
            return (
              <Button
                className="checkout-button"
                type="primary"
                onClick={() => {
                  navigate();
                  this.handlePopoverClick();
                }}
              >
                Checkout
              </Button>
            );
          }} />
      </div>
    );

    return (
      <Popover
        position="bottomleft"
        content={popoverContent}
        onClick={this.handlePopoverClick}
        controlShow={showPopover}
      >
        <div className="shopping-cart-container">
          <i className="nav-item fa fa-shopping-cart"></i>
          {notificationUI}
        </div>
      </Popover>
    )
  }
}

const mapStateToProps: MapStateToProps<
  ShoppingCartStateProps,
  ShoppingCartOwnProps,
  StoreStateType
> = (state) => {
  const { cart } = state.user;
  
  return {
    cart,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  ShoppingCartDispatchProps,
  ShoppingCartOwnProps
> = (dispatch) => {
  const { removeFromCart } = new UserAction();

  return {
    removeFromCart: (productPurchase) => dispatch(removeFromCart(productPurchase)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);