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

  // mergeNewCart(guestCart) {
  //   guestCart.map((order) => {
  //     this.props.createCandyOrder({
  //       orderId: this.props.cart.id,
  //       candyId: order.candy.id,
  //       quantity: order.quantity,
  //       price: order.price,
  //     });
  //   });
  // }

  // mergeExistingCart(guestCart, candyOrders) {
  //   for (const order of guestCart) {
  //     const mergedOrder = {};
  //     let doesExist = false;
  //     for (let i = 0; i < candyOrders.length; i++) {
  //       if (candyOrders[i].candyId === order.candyId) {
  //         (mergedOrder.orderId = candyOrders[i].orderId),
  //           (mergedOrder.candyId = order.candyId),
  //           (mergedOrder.quantity = order.quantity + candyOrders[i].quantity),
  //           (mergedOrder.price = order.price + candyOrders[i].price),

  //         break;
  //       }
  //     }
  //   }
  // }

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
        this.mergeNewCart(trackedOrders);
        // Case: if there is a guest cart, user cart, and candyOrders
      } else if (trackedOrders !== null && this.props.candyOrders.length > 0) {
        const candyOrders = this.props.candyOrders;
        // Handle each order from the guest cart
        for (const order of trackedOrders) {
          let doesExist = false;
          // Run through existing order. If item exists update with total qty & length, else update the items orderId
          const updatedOrder = {};
          // Check if the order matches any of the orders from candyOrders
          for (let i = 0; i < candyOrders.length; i++) {
            // If it exists, store updated candyOrder in updatedOrder
            if (candyOrders[i].candyId === order.candyId) {
              (updatedOrder.orderId = candyOrders[i].orderId),
                (updatedOrder.candyId = order.candyId),
                (updatedOrder.quantity =
                  candyOrders[i].quantity + order.quantity),
                (updatedOrder.price = candyOrders[i].price + order.price);

              doesExist = true;
              break;
              // Else create a new candy order object
            } else {
              (updatedOrder.orderId = candyOrders[i].orderId),
                (updatedOrder.candyId = order.candyId),
                (updatedOrder.quantity = order.quantity),
                (updatedOrder.price = order.price);
            }
          }
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

  render() {
    return (
      <div>
        <h3 id="welcome-user">Welcome, {this.props.auth.username}</h3>
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
