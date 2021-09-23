import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCart } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadCart(this.props.auth.id);
  }
  render() {
    const candyOrders = this.props.cart.candyorders || [];
    return (
      <Link to={`/checkout`}>
        <span>Cart {candyOrders.length}</span>
      </Link>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  loadCart: (id) => dispatch(setCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
