import React from "react";
import { connect } from "react-redux";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h4>Thank you placing your order!</h4>
        <button type="button">Return to Homepage</button>
      </React.Fragment>
    );
  }
}
