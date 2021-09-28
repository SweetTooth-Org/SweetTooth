import React from 'react';
import { connect } from 'react-redux';
import { fetchCandies } from '../store/candies';
import { createCart } from '../store/cart';
import { Link } from 'react-router-dom';
import { createCandyOrder } from '../store/candyOrders';
import { updateCandyQuantity } from '../store/candyOrders';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

class CandiesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateCart = this.handleCreateCart.bind(this);
    this.state = {
      areYouGuest: false,
    };
  }

  componentDidMount() {
    this.props.loadCandies();

    if (typeof window !== 'undefined') {
      injectStyle();
    }
  }

  handleCart(candy, userId) {
    this.props.isLoggedIn
      ? this.handleCreateCart(candy, userId)
      : this.handleGuestCart(candy);

    toast(`Added ${candy.name} to cart.`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  handleGuestCart(candy) {
    // Creating the candyOrder instance
    const candyOrder = {};
    candyOrder.candyId = candy.id;
    candyOrder.price = candy.price;
    candyOrder.quantity = 1;
    candyOrder.candy = candy;

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
    this.setState({
      areYouGuest: true,
    });
  }

  async handleCreateCart(candy, userId) {
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
          price: candy.price * updatedQuantity,
        });
      } else {
        //create new candyOrder
        await this.props.createCandyOrder({
          orderId: this.props.cart.id,
          candyId: candy.id,
          quantity: 1,
          price: candy.price,
        });
      }
    } else {
      await this.props.createCart({ userId });
      await this.props.createCandyOrder({
        orderId: this.props.cart.id,
        candyId: candy.id,
        quantity: 1,
        price: candy.price,
      });
    }
  }

  render() {
    let areYouGuest;
    const trackedOrders = JSON.parse(localStorage.getItem('tracked-orders'));

    const candies = this.props.candies;
    const userId = this.props.userId;

    if (trackedOrders)
      areYouGuest = (
        <div className="are-you-guest">PLEASE LOGIN OR SIGN UP TO CHECKOUT</div>
      );

    if (this.props.isLoggedIn) areYouGuest = <React.Fragment></React.Fragment>;

    return (
      <React.Fragment>
        {areYouGuest}
        <h2>Shop All Candies</h2>
        <div id="all-candies-view">
          {candies.map((candy) => {
            return (
              <div id="candy-item" key={candy.id}>
                <Link to={`/candies/${candy.id}`}>
                  <h4>{candy.name}</h4>
                  <img id="all-candy-img" src={candy.imageUrl} />
                  <h4>{(candy.price / 100).toFixed(2)}</h4>
                </Link>
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={() => this.handleCart(candy, userId)}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    candies: state.candies,
    userId: state.auth.id,
    cart: state.cart,
    candyOrders: state.candyOrders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadCandies: () => dispatch(fetchCandies()),
    createCart: (userId) => dispatch(createCart(userId)),
    createCandyOrder: (candyOrder) => dispatch(createCandyOrder(candyOrder)),
    updateCandyQuantity: (candyOrder) =>
      dispatch(updateCandyQuantity(candyOrder)),
  };
};

export default connect(mapState, mapDispatch)(CandiesList);
