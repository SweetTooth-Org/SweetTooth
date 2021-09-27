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
    return (
      <Link to={`/orderslist`}>
        <span>Order History</span>
        <div id="checkout-container">
          {orders.map((order) => {
            return (
              <div id="checkout-item" key={order.id}></div>
            )
          })}
        </div>
      </Link>

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
