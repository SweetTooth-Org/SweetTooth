import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCandy } from '../store/singleCandy';
import { createCart } from '../store/cart';
import { createCandyOrder } from '../store/candyOrders';
import { updateCandyQuantity } from '../store/candyOrders';

export class SingleCandy extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.loadSingleCandy(this.props.match.params.candyId);
  }

  handleCart(singleCandy, userId) {
    this.props.isLoggedIn
      ? this.handleAddToCart(singleCandy, userId)
      : this.handleGuestCart(singleCandy);
  }

  handleGuestCart(candy) {
    // Creating the candyOrder instance
    const candyOrder = {};
    candyOrder.candyId = candy.id;
    candyOrder.price = candy.price;
    candyOrder.quantity = 1;

    // Parsing or creating the array from local storage
    const cartHistory =
      JSON.parse(localStorage.getItem('tracked-orders')) || [];

    // does item exist in our local storage?
    let doesExist = false;

    // Updating quantity, price and doesExist
    cartHistory.forEach((item) => {
      if (item.candyId === candyOrder.candyId) {
        doesExist = true;
        item.quantity = item.quantity + 1;
        item.price = item.price * item.quantity;
      }
    });

    // If does not exist push new item to array
    if (!doesExist) {
      cartHistory.push(candyOrder);
    }

    localStorage.setItem('tracked-orders', JSON.stringify(cartHistory));
  }

  async handleAddToCart(candy, userId) {
    if (this.props.cart.id) {
      //check if the candy exists in candyOrders
      let preexistingCandyOrder = this.props.candyOrders.reduce(
        (accum, candyOrder) => {
          if (candyOrder.candyId === candy.id) {
            accum = { ...candyOrder };
            return accum;
          }
          return accum;
        },
        {}
      );
      if (Object.keys(preexistingCandyOrder).length > 0) {
        const updatedQuantity = preexistingCandyOrder.quantity + 1;
        //increment quantity of existing candyOrder
        await this.props.updateCandyQuantity({
          ...preexistingCandyOrder,
          quantity: updatedQuantity,
          price: Math.round(candy.price * updatedQuantity),
        });
      } else {
        //create new candyOrder
        await this.props.createCandyOrder({
          orderId: this.props.cart.id,
          candyId: candy.id,
          quantity: 1,
          price: Math.round(candy.price),
        });
      }
    } else {
      await this.props.createCart({ userId });
      await this.props.createCandyOrder({
        orderId: this.props.cart.id,
        candyId: candy.id,
        quantity: 1,
        price: Math.round(candy.price),
      });
    }
  }

  render() {
    const singleCandy = this.props.singleCandy;
    const userId = this.props.userId;
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
                <h3>{`Price: $ ${(singleCandy.price / 100).toFixed(2)}`}</h3>
                <button
                  className="add-cart-button"
                  onClick={() => this.handleCart(singleCandy, userId)}
                >
                  Add To Cart
                </button>
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
    isLoggedIn: !!state.auth.id,
    singleCandy: state.singleCandy,
    userId: state.auth.id,
    cart: state.cart,
    candyOrders: state.candyOrders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleCandy: (candyId) => dispatch(fetchSingleCandy(candyId)),
    createCart: (userId) => dispatch(createCart(userId)),
    createCandyOrder: (candyOrder) => dispatch(createCandyOrder(candyOrder)),
    updateCandyQuantity: (candyOrder) =>
      dispatch(updateCandyQuantity(candyOrder)),
  };
};

export default connect(mapState, mapDispatch)(SingleCandy);
