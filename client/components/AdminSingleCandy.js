import React, { Component } from 'react';
import { deleteCandy } from '../store/candies';
import { connect } from 'react-redux';
import AdminAddCandyForm from './AdminCandyForm';
import { Link } from 'react-router-dom';

//This is a component for each candy in the admin view. Eaiser for me to use the buttons attached to the particular candy
//Maybe there is a better way...

class AdminSingleCandy extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.removeCandy(this.props.candy.id);
  }

  render() {
    const candy = this.props.candy;

    return (
      <div className="admin-single-candy-card">
        <div>{`Name: ${candy.name}`}</div>
        <div>{`Price: ${candy.price}`}</div>
        <button onClick={this.handleRemove} className="admin-remove-btn btn">
          Remove
        </button>
        <Link to={`/edit/${candy.id}`}>
          <button className="admin-edit-btn btn">Edit</button>
        </Link>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeCandy: (candyId) => dispatch(deleteCandy(candyId)),
  };
};

export default connect(null, mapDispatch)(AdminSingleCandy);
