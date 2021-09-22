import React from 'react';
import { connect } from 'react-redux';
import { fetchCandies } from '../store/candies';
import { createCart } from '../store/cart'
import { Link } from 'react-router-dom';
import { createCandyOrder } from '../store/candyOrders'

class CandiesList extends React.Component {

  constructor(props) {
    super(props)
    this.handleCreateCart = this.handleCreateCart.bind(this)
  }

  componentDidMount() {
    this.props.loadCandies();
  }

  async handleCreateCart(candy, userId) {
    if (this.props.cart.id){
      //
    } else {
      await this.props.createCart({userId})
      await this.props.createCandyOrder({
        orderId: this.props.cart.id,
        candyId: candy.id,
        quantity: 1
      })
    }
  }

  render() {
    const candies = this.props.candies;
    const userId = this.props.userId
    console.log(candies);
    return (
      <React.Fragment>
        <h2>Shop All Candies</h2>
        <div id="all-candies-view">
          {candies.map((candy) => {
            return (
              <div id="candy-item" key={candy.id}>
                <Link to={`/candies/${candy.id}`}>
                <h4>{candy.name}</h4>
                <img id="all-candy-img" src={candy.imageUrl} />
                <h4>{candy.price}</h4>
                </Link>
                <button type="button" onClick={() => this.handleCreateCart(candy, userId)}>Add To Cart</button>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    candies: state.candies,
    userId: state.auth.id,
    cart: state.cart,
    candyOrders: state.candyOrders
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCandies: () => dispatch(fetchCandies()),
    createCart: (userId) => dispatch(createCart(userId)),
    createCandyOrder: (candyOrder) => dispatch(createCandyOrder(candyOrder))
  };
};

export default connect(mapState, mapDispatch)(CandiesList);
