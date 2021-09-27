import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import { logoutCart } from '../store/cart';
import { logoutCandyOrders } from '../store/candyOrders';
import Cart from './Cart';
import GuestCart from './GuestCart';
import OrderHistoryButton from './OrderHistoryButton';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>SweetTooth</h1>
    <nav>
      {isLoggedIn ? (
        <div className="nav-container">
          <div>
            <NavLink to="/home">Home</NavLink>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
          <div>
            <OrderHistoryButton />
            <Cart />
          </div>
        </div>
      ) : (
        <div className="nav-container">
          <div>
            <NavLink to="/login">Home</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
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
