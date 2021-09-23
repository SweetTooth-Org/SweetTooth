import React from 'react';
import { connect } from 'react-redux';
import { updateCandyQuantity } from '../store/candyOrders';
import { Link } from 'react-router-dom'
import { checkoutCart } from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeQty = this.handleChangeQty.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this)
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
    console.log('entered handleCheckout')
    const cart = this.props.cart
    await this.props.checkoutCart({...cart, isFulfilled: true})
  }

  render() {
    const candyOrders = this.props.candyOrders;
    return (
      <React.Fragment>
        <h2>Checkout</h2>
        <div id="checkout-container">
          {candyOrders.map((candyOrder) => {
            return (
              <div id="checkout-item" key={candyOrder.candy.id}>
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
                  Total Price: $ {candyOrder.candy.price * candyOrder.quantity}
                </h4>
              </div>
            );
          })}
        </div>
        <div id="total-checkout">
          <h3>Total: $$$</h3>
          <Link to="/confirmation">
            <button type="button" onClick={() => this.handleCheckout()}>Checkout</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    candyOrders: state.candyOrders,
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateCandyQuantity: (candyOrder) =>
      dispatch(updateCandyQuantity(candyOrder)),
    checkoutCart: (cart) => dispatch(checkoutCart(cart))
  };
};

export default connect(mapState, mapDispatch)(Checkout);
