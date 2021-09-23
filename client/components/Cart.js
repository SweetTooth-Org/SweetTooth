import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCart } from '../store/cart';
import { setCandyOrders } from '../store/candyOrders';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.loadCart(this.props.auth.id);
    if (this.props.cart.userId) {
      await this.props.loadCandyOrders(this.props.cart.id);
    }
  }

  render() {
    return (
      <Link to={`/checkout`}>
        <span>Cart {`(${this.props.candyOrders.length})`}</span>
      </Link>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
  candyOrders: state.candyOrders,
});

const mapDispatch = (dispatch) => ({
  loadCart: (id) => dispatch(setCart(id)),
  loadCandyOrders: (id) => dispatch(setCandyOrders(id)),
});

export default connect(mapState, mapDispatch)(Cart);
