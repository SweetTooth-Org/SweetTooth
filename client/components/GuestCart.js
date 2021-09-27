import React from 'react';
import { Link } from 'react-router-dom';

class GuestCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={'/checkout'}>
        <span>Cart </span>
      </Link>
    );
  }
}

export default GuestCart;
