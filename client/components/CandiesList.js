import React from 'react';
import { connect } from 'react-redux';
import { fetchCandies } from '../store/candies';
import { Link } from 'react-router-dom';

class CandiesList extends React.Component {
  componentDidMount() {
    this.props.loadCandies();
  }
  render() {
    const candies = this.props.candies;
    console.log(candies);
    return (
      <React.Fragment>
        <h2>Shop All Candies</h2>
        <div id="all-candies-view">
          {candies.map((candy) => {
            return (
              <Link to={`/candies/${candy.id}`} key={candy.id}>
                <div id="candy-item">
                  <h4>{candy.name}</h4>
                  <img id="all-candy-img" src={candy.imageUrl} />
                  <h4>{candy.price}</h4>
                  <button type="button">Add To Cart</button>
                </div>
              </Link>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    candies: state.candies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCandies: () => dispatch(fetchCandies()),
  };
};

export default connect(mapState, mapDispatch)(CandiesList);
