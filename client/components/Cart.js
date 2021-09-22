import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    return (
      <Link to={`/checkout`}>
        <span>Cart {''}</span>
      </Link>
    );
  }
}

export default connect(null)(Cart);
