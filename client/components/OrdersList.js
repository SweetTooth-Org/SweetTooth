import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setOrders } from '../store/orders'

class OrdersList extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.loadOrders(this.props.userId)
  }

  render() {
    const orders = this.props.orders
    let orderCount = 0
    return (
      <React.Fragment>
        <h2>Order History</h2>
        <div>
          {orders.map((order) => {
            let total = 0
            orderCount++
            return (
              <div id="order-item" key={order.id}>
                <h3>Order {order.id}</h3>
                {order.candyorders.map((candyOrder) => {
                  total += candyOrder.price * candyOrder.quantity;
                  candyOrder.candy = order.candies.filter((candy) => candy.id === candyOrder.candyId)[0]
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
                          <h4>{candyOrder.quantity}</h4>
                        </div>
                      </div>
                      <h4>$ {(candyOrder.price / 100).toFixed(2)}</h4>
                      <h4>
                        Total Price: ${' '}
                        {(
                          (candyOrder.price * candyOrder.quantity) /
                          100
                        ).toFixed(2)}
                      </h4>
                    </div>
                  );
                })}
                <div id="order-total-checkout">
                  <h3>Order Total: {(total / 100).toFixed(2)}</h3>
                </div>
              </div>
              )
          })}
        </div>
      </React.Fragment>

    )
  }

}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    orders: state.orders
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrders: (id) => dispatch(setOrders(id))
  }
}

export default connect(mapState, mapDispatch)(OrdersList)
