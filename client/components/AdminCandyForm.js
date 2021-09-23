import React, { Component } from 'react';
import { submitNewCandy } from '../store/candies';
import { connect } from 'react-redux';
import { updateCandy } from '../store/candies';
import { fetchSingleCandy, setSingleCandy } from '../store/singleCandy';
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

  componentDidMount() {
    if (Object.keys(this.props.match.params).length) {
      this.props.loadSingleCandy(this.props.match.params.candyId);
    } else {
      this.props.setSingleCandy({});
    }
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
    const singleCandy = this.props.singleCandy;
    const name = Object.keys(singleCandy).length ? singleCandy.name : '';
    const price = Object.keys(singleCandy).length ? singleCandy.price : '';
    let title;
    if (this.props.match.params.candyId) {
      title = 'Update';
    } else {
      title = 'Add a Candy';
    }
    return (
      <div className="form-container">
        <div className="form">
          <header className="form-header">
            <span>{`${title} ${name}`}</span>
          </header>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="price">Name</label>
            <textarea
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder={`${name}(Required)`}
              rows="1"
              cols="40"
            />
            <label htmlFor="imageUrl">Price</label>
            <textarea
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder={`${price}(Required)`}
              rows="1"
              cols="40"
            />
            <label htmlFor="imageUrl">ImageUrl</label>
            <textarea
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              placeholder="Not required..."
              rows="5"
              cols="40"
            />
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Not required..."
              rows="9"
              cols="40"
            />

            <button type="submit">Submit!</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    singleCandy: state.singleCandy,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addCandy: function (newCandyObj) {
      return dispatch(submitNewCandy(newCandyObj));
    },
    updateCandy: function (candyId, newCandyObj) {
      return dispatch(updateCandy(candyId, newCandyObj));
    },
    loadSingleCandy: function (candyId) {
      return dispatch(fetchSingleCandy(candyId));
    },
    setSingleCandy: function (candy) {
      return dispatch(setSingleCandy(candy));
    },
  };
};

export default connect(mapState, mapDispatch)(AdminCandyForm);
