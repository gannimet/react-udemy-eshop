import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants/route';
import { StoreStateType } from '../../store/rootReducer';
import Button from '../../ui-components/Button';
import Popover from '../../ui-components/Popover';
import { ShoppingCartOwnProps, ShoppingCartProps, ShoppingCartState, ShoppingCartStateProps } from './interface';
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

  getAllProducts = () => {
    return null;
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

export default connect(mapStateToProps)(ShoppingCart);