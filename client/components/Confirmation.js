import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h4>Thank you placing your order!</h4>
        <Link to='/home'>
          <button type="button">Return to Homepage</button>
        </Link>
      </React.Fragment>
    );
  }
}

export default connect(null)(Confirmation)
