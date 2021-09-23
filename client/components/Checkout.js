import React from 'react';
import { connect } from 'react-redux';
import { updateCandyQuantity } from '../store/candyOrders';
import { checkoutCandyOrders } from '../store/candyOrders';
import { Link } from 'react-router-dom';
import { checkoutCart } from '../store/cart';
import { deleteCandyOrder } from '../store/candyOrders';
import { setCart } from '../store/cart';
import { setCandyOrders } from '../store/candyOrders';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeQty = this.handleChangeQty.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete(candyOrder) {
    await this.props.deleteCandyOrder(candyOrder);
    await this.props.loadCandyOrders(this.props.cart.id);
  }

  handleChangeQty(candyOrder, type) {
    if (type === 'add') {
      this.props.updateCandyQuantity({
        ...candyOrder,
        quantity: candyOrder.quantity + 1,
      });
    } else {
      this.props.updateCandyQuantity({
        ...candyOrder,
        quantity: candyOrder.quantity - 1,
      });
    }
  }

  async handleCheckout() {
    const cart = this.props.cart;
    await this.props.checkoutCart({ ...cart, isFulfilled: true });
    await this.props.checkoutCandyOrders();
  }

  render() {
    const candyOrders = this.props.candyOrders;
    let total = 0;
    return (
      <React.Fragment>
        <h2>Checkout</h2>
        <div id="checkout-container">
          {candyOrders.map((candyOrder) => {
            total += candyOrder.candy.price * candyOrder.quantity;
            return (
              <div
                id="checkout-item"
                key={`${candyOrder.candyId} ${candyOrder.orderId}`}
              >
                <img id="all-candy-img" src={candyOrder.candy.imageUrl} />
                <h4>{candyOrder.candy.name}</h4>
                <div>
                  <h4>Quantity: </h4>
                  <div id="quantity-slider">
                    <button
                      type="button"
                      onClick={() =>
                        this.handleChangeQty(candyOrder, 'subtract')
                      }
                    >
                      -
                    </button>
                    <h4>{candyOrder.quantity}</h4>
                    <button
                      type="button"
                      onClick={() => this.handleChangeQty(candyOrder, 'add')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <h4>$ {candyOrder.candy.price}</h4>
                <h4>
                  Total Price: ${' '}
                  {(candyOrder.candy.price * candyOrder.quantity).toFixed(2)}
                </h4>
                <button
                  id="delete-item"
                  type="button"
                  onClick={() => this.handleDelete(candyOrder)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div id="total-checkout">
          <h2>Total: {total.toFixed(2)}</h2>
          <Link to="/confirmation">
            <button type="button" onClick={() => this.handleCheckout()}>
              Checkout
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    candyOrders: state.candyOrders,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCandyOrders: (id) => dispatch(setCandyOrders(id)),
    updateCandyQuantity: (candyOrder) =>
      dispatch(updateCandyQuantity(candyOrder)),
    deleteCandyOrder: (candyOrder) => dispatch(deleteCandyOrder(candyOrder)),
    checkoutCart: (cart) => dispatch(checkoutCart(cart)),
    checkoutCandyOrders: () => dispatch(checkoutCandyOrders()),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
