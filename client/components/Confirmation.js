import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="confirmation-container">
        <h2>Thank you placing your order!</h2>
        <Link to="/home">
          <button type="button">Return to Homepage</button>
        </Link>
      </div>
    );
  }
}

export default connect(null)(Confirmation);
