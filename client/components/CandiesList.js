import React from 'react';
import { connect } from 'react-redux';
import { fetchCandies } from '../store/candies';
import { createCart } from '../store/cart'
import { Link } from 'react-router-dom';
import { createCandyOrder } from '../store/candyOrders'
import { updateCandyQuantity } from '../store/candyOrders'

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
      //check if the candy exists in candyOrders
      let preexistingCandyOrder = this.props.candyOrders.reduce((accum, candyOrder) => {
        if (candyOrder.candyId === candy.id) {
          accum = {...candyOrder}
          return accum
        }
        return accum
      }, {})
      if (Object.keys(preexistingCandyOrder).length > 0) {
        //increment quantity of existing candyOrder
        await this.props.updateCandyQuantity({...preexistingCandyOrder, quantity: preexistingCandyOrder.quantity+1})
      } else {
        //create new candyOrder
        await this.props.createCandyOrder({
          orderId: this.props.cart.id,
          candyId: candy.id,
          quantity: 1
        })
      }

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
                <h4>{(candy.price/100).toFixed(2)}</h4>
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
    createCandyOrder: (candyOrder) => dispatch(createCandyOrder(candyOrder)),
    updateCandyQuantity: (candyOrder) => dispatch(updateCandyQuantity(candyOrder))
  };
};

export default connect(mapState, mapDispatch)(CandiesList);
