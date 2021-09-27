import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { logoutCart } from '../store/cart';
import { logoutCandyOrders } from '../store/candyOrders';
import Cart from './Cart';
import GuestCart from './GuestCart';
import OrderHistoryButton from './OrderHistoryButton'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>SweetTooth</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Cart />
          <OrderHistoryButton />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <GuestCart />
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    async handleClick() {
      await dispatch(logout());
      await dispatch(logoutCart());
      await dispatch(logoutCandyOrders());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
