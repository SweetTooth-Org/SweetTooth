import React from 'react';
import { connect } from 'react-redux';
import CandiesList from './CandiesList';
import { setCart } from '../store/cart';
import { setCandyOrders, createCandyOrder } from '../store/candyOrders';
import { createCart } from '../store/cart';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const userId = this.props.auth.id;

    await this.props.loadCart(userId);
    if (this.props.cart.userId) {
      await this.props.loadCandyOrders(this.props.cart.id);
    } else {
      const trackedOrders = JSON.parse(localStorage.getItem('tracked-orders'));

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
  };
};

export default connect(mapState, mapDispatch)(Home);

/*
Once someone logs in or signs up 
- Check if cart exists 
  - Exists: 
    - Load candyOrders
    - Check if local storage has items 
      - Exists: 
        - Loop through local storage -> if candyId then local.qty + candy.qty else push to candyOrders
        - delet local storage
      - Doesn't exist:
        - Add all local storage to candyOrders
        - delete local storage
  - Doesn't exist: 
    - Create cart
    - create candyOrders
*/
