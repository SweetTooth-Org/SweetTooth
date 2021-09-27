import React from 'react';
import { connect } from 'react-redux';
import CandiesList from './CandiesList';
import { setCart } from '../store/cart';
import {
  setCandyOrders,
  createCandyOrder,
  updateCandyQuantity,
} from '../store/candyOrders';
import { createCart } from '../store/cart';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // Set userId & load tackerOrders (null if no cart)
    const userId = this.props.auth.id;
    const trackedOrders = JSON.parse(localStorage.getItem('tracked-orders'));

    // Attempt to load cart
    await this.props.loadCart(userId);
    // If cart exists attempt to load candyOrders of cart
    if (this.props.cart.userId) {
      await this.props.loadCandyOrders(this.props.cart.id);

      // Case: if there is a guest cart, user cart but no candyOrders
      if (trackedOrders !== null && this.props.candyOrders.length === 0) {
        for (const order of trackedOrders) {
          let candy = order.candy;
          await this.props.createCandyOrder({
            orderId: this.props.cart.id,
            candyId: candy.id,
            quantity: order.quantity,
            price: order.price,
          });
        }
        // Case: if there is a guest cart, user cart, and candyOrders
      } else if (trackedOrders !== null && this.props.candyOrders.length > 0) {
        // Handle each order from the guest cart
        for (const order of trackedOrders) {
          let doesExist = false;
          // Run through existing order. If item exists update with total qty & length, else update the items orderId
          const updatedOrder = this.props.candyOrders.reduce((accum, value) => {
            if (value.candyId === order.candyId) {
              (accum.orderId = value.orderId),
                (accum.candyId = order.candyId),
                (accum.quantity = value.quantity + order.quantity),
                (accum.price = value.price + order.price);

              doesExist = true;

              return accum;
            } else {
              (accum.orderId = value.orderId),
                (accum.candyId = order.candyId),
                (accum.quantity = order.quantity),
                (accum.price = order.price);

              return accum;
            }
          }, {});

          console.log('UPDATE:::', updatedOrder);
          // Updating the candyOrder or adding it if it doesn't exist
          doesExist
            ? await this.props.updateCandyOrder(updatedOrder)
            : await this.props.createCandyOrder(updatedOrder);
        }
      }
      // Case: when there's a guest cart but no cart and no candyOrders
    } else {
      if (trackedOrders !== null) {
        await this.props.createCart({ userId });

        for (const order of trackedOrders) {
          let candy = order.candy;
          await this.props.createCandyOrder({
            orderId: this.props.cart.id,
            candyId: candy.id,
            quantity: order.quantity,
            price: order.price,
          });
        }
      }
    }
    localStorage.removeItem('tracked-orders');
  }
  4;

  render() {
    return (
      <div>
        <h3>Welcome, {this.props.auth.username}</h3>
        <CandiesList />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
    candyOrders: state.candyOrders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCart: (id) => dispatch(setCart(id)),
    loadCandyOrders: (id) => dispatch(setCandyOrders(id)),
    createCart: (userId) => dispatch(createCart(userId)),
    createCandyOrder: (candyOrder) => dispatch(createCandyOrder(candyOrder)),
    updateCandyOrder: (candyOrder) => dispatch(updateCandyQuantity(candyOrder)),
  };
};

export default connect(mapState, mapDispatch)(Home);
