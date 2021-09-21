import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCandy } from '../store/singleCandy';

export class SingleCandy extends Component {
  componentDidMount() {
    this.props.loadSingleCandy(this.props.match.params.candyId);
  }
  render() {
    const singleCandy = this.props.singleCandy;
    return (
      <div>
        <React.Fragment>
          <div className="main-container">
            <h1 className="single-candy-name">{singleCandy.name}</h1>
            <div className="single-candy-container">
              <div>
                <img className="single-candy-img" src={singleCandy.imageUrl} />
              </div>
              <div>
                <p className="candy-description">
                  CANDY DESCRIPTION IS CURRENTLY NULL IN DATABASE Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not on
                </p>
                <h3>{`Price: $ ${singleCandy.price}`}</h3>
                <button className="add-cart-button">Add To Cart</button>
              </div>
            </div>
          </div>
        </React.Fragment>
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
    loadSingleCandy: (candyId) => dispatch(fetchSingleCandy(candyId)),
  };
};

export default connect(mapState, mapDispatch)(SingleCandy);
