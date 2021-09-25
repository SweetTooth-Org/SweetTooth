import React from 'react';
import { Link } from 'react-router-dom';

class GuestCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candyOrders: [],
      total: 0,
    };

    this.loadLocalStorage = this.loadLocalStorage.bind(this);
    this.handleChangeQty = this.handleChangeQty.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    // Getting local storage & total price
    const trackedOrders = JSON.parse(localStorage.getItem('tracked-orders'));
    const total = trackedOrders.reduce((accum, order) => {
      return (accum += order.price);
    }, 0);

    this.setState({
      candyOrders: [...trackedOrders],
      total,
    });
  }

  handleChangeQty(candyOrder, type) {
    // Grabbing localStorage item
    const trackedOrders = JSON.parse(localStorage.getItem('tracked-orders'));

    // Update tracked orders array based on type (add/subtract)
    const updatedTrackedOrders = trackedOrders.map((order) => {
      const updatedOrder = {
        ...candyOrder,
        quantity:
          type === 'add' ? candyOrder.quantity + 1 : candyOrder.quantity - 1,
        price:
          type === 'add'
            ? candyOrder.candy.price * (candyOrder.quantity + 1)
            : candyOrder.candy.price * (candyOrder.quantity - 1),
      };
      return updatedOrder.candyId === order.candyId ? updatedOrder : order;
    });

    // Get updated total price
    const total = updatedTrackedOrders.reduce((accum, order) => {
      return (accum += order.price);
    }, 0);

    // Update localStorage
    localStorage.setItem(
      'tracked-orders',
      JSON.stringify(updatedTrackedOrders)
    );

    // Update state
    this.setState({
      candyOrders: [...updatedTrackedOrders],
      total,
    });
  }

  handleDelete(candyOrder) {
    const trackedOrders = JSON.parse(localStorage.getItem('tracked-orders'));

    const updatedTrackedOrders = trackedOrders.filter((order) => {
      return candyOrder.candyId !== order.candyId;
    });

    const total = updatedTrackedOrders.reduce((accum, order) => {
      return (accum += order.price);
    }, 0);

    localStorage.setItem(
      'tracked-orders',
      JSON.stringify(updatedTrackedOrders)
    );

    this.setState({
      candyOrders: [...updatedTrackedOrders],
      total,
    });
  }

  render() {
    const candyOrders = this.state.candyOrders;

    return (
      <React.Fragment>
        <h2>Checkout</h2>
        <div id="guest-checkout-container">
          {candyOrders.map((candyOrder) => {
            return (
              <div
                id="checkout-item"
                key={`${candyOrder.candyId} ${candyOrder.orderId}`}
              >
                <img id="all-candy-img" src={candyOrder.candy.imageUrl} />
                <h4>{candyOrder.candy.name}</h4>
                <div>
                  <h4>Quantity: </h4>
                  <div id="quantity-slider">
                    <button
                      type="button"
                      onClick={() =>
                        this.handleChangeQty(candyOrder, 'subtract')
                      }
                    >
                      -
                    </button>
                    <h4>{candyOrder.quantity}</h4>
                    <button
                      type="button"
                      onClick={() => this.handleChangeQty(candyOrder, 'add')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <h4>$ {(candyOrder.candy.price / 100).toFixed(2)}</h4>
                <h4>Total Price: $ {(candyOrder.price / 100).toFixed(2)}</h4>
                <button
                  id="delete-item"
                  type="button"
                  onClick={() => this.handleDelete(candyOrder)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div id="total-checkout">
          <h2>Total: {(this.state.total / 100).toFixed(2)}</h2>
          <Link to="/confirmation">
            <button type="button">Checkout</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default GuestCheckout;
