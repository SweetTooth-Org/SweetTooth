import React, { Component } from 'react';
import { submitNewCandy } from '../store/candies';
import { connect } from 'react-redux';
import { updateCandy } from '../store/candies';
import { fetchSingleCandy } from '../store/singleCandy';
import { Link } from 'react-router-dom';

//This form can either be an 'add candy' form or an 'update' candy form, depending on if a candyId is present.
//If candyId is present we want to update that candy
//If no Id is present we are trying to create a new candy
//The candyId is passed from 'edit' button attached to each candy via 'props.match.params.candyId'

//Need to find a way to place the current values of the particular candy in the update form
const initState = {
  name: '',
  price: '',
  imageUrl: '',
  description: '',
};

class AdminCandyForm extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.match.params.candyId) {
      this.props.updateCandy(this.props.match.params.candyId, this.state);
    } else {
      this.props.addCandy(this.state);
    }

    this.setState(initState);
  }
  render() {
    let title;
    if (this.props.match.params.candyId) {
      title = 'Update Candy';
    } else {
      title = 'Add a Candy';
    }
    return (
      <div className="add-form-container">
        <span>{title}</span>
        <form onSubmit={this.handleSubmit}>
          <div className="container-form-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Name"
            ></input>
          </div>
          <div className="container-form-field">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="container-form-field">
            <label htmlFor="imageUrl">ImageUrl</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            ></input>
          </div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Not required..."
            rows="12"
            cols="40"
          />

          <button type="submit">Submit!</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCandy: function (newCandyObj) {
      return dispatch(submitNewCandy(newCandyObj));
    },
    updateCandy: function (candyId, newCandyObj) {
      return dispatch(updateCandy(candyId, newCandyObj));
    },
  };
};

export default connect(null, mapDispatch)(AdminCandyForm);
